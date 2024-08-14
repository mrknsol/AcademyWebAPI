using webapi.Models;
using webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using webapi.Exceptions;
using webapi.Context;

namespace webapi.Services.Classes;

public class AuthService : IAuthService
{
    private readonly AcademyContext _context;
    private readonly ITokenService _tokenService;
    private readonly IBlackListService _blackListService;
    public AuthService(AcademyContext context, ITokenService tokenService, IBlackListService blackListService)
    {
        _context = context;
        _tokenService = tokenService;
        _blackListService = blackListService;
    }

    public async Task<TokenData> LoginUserAsync(SignInUser user)
    {    
        var foundUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

        if (!BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password))
        {
            throw new MyAuthException(AuthErrorTypes.InvalidCredentials, "Invalid password");
        }

        var tokenData = new TokenData()
        {
            AccessToken = await _tokenService.GenerateTokenAsync(foundUser),
            RefreshToken = await _tokenService.GenerateRefreshTokenAsync(),
            RefreshTokenExpireTime = DateTime.Now.AddDays(1)
        };

        foundUser.RefreshToken = tokenData.RefreshToken;
        foundUser.RefreshTokenExpiryTime = tokenData.RefreshTokenExpireTime;

        await _context.SaveChangesAsync();

        return tokenData;
    }


    public async Task LogOutAsync(UserTokenInfo userTokenInfo)
    {
        if (userTokenInfo is null)
            throw new MyAuthException(AuthErrorTypes.InvalidRequest, "Invalid client request");

        var principal = _tokenService.GetPrincipalFromExpiredToken(userTokenInfo.AccessToken);

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.FirstOrDefault(u => u.Email == email);

        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = DateTime.Now;

        _blackListService.AddTokenToBlackList(userTokenInfo.AccessToken);

        await _context.SaveChangesAsync();
        
    }

    public async Task<TokenData> RefreshTokenAsync(UserTokenInfo userAccessData)
    {
        if (userAccessData is null)
            throw new MyAuthException(AuthErrorTypes.InvalidRequest, "Invalid client request");

        var accessToken = userAccessData.AccessToken;
        var refreshToken = userAccessData.RefreshToken;

        var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.FirstOrDefault(u => u.Email == email);

        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            throw new MyAuthException(AuthErrorTypes.InvalidRequest, "Invalid client request");

        var newAccessToken = await _tokenService.GenerateTokenAsync(user);
        var newRefreshToken = await _tokenService.GenerateRefreshTokenAsync();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddMinutes(35);

        await _context.SaveChangesAsync();

        return new TokenData
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            RefreshTokenExpireTime = user.RefreshTokenExpiryTime
        };
    }

    public async Task<User> RegisterUserAsync(SignUpUser user)
    {
        try
        {
            var newUser = new User{
                Name = user.Name,
                Surname = user.Surname,
                Age = user.Age,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                Role = "appuser"
            };

            await _context.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }
        catch
        {
            throw;
        }
    }
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }
}
