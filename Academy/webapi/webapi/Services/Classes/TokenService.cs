using webapi.Models;
using webapi.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace webapi.Services.Classes;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public async Task<string> GenerateRefreshTokenAsync()
    {
        return Guid.NewGuid().ToString();
    }

    public async Task<string> GenerateTokenAsync(User user)
{
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
    var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

    var securityToken = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(10),
        issuer: _config.GetSection("Jwt:Issuer").Value,
        audience: _config.GetSection("Jwt:Audience").Value,
        signingCredentials: signingCred);

    string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
    return tokenString;
}

public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
{
    var tokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false, 
        ValidateIssuer = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value)),
        ValidateLifetime = false 
    };

    var tokenHandler = new JwtSecurityTokenHandler();

    SecurityToken securityToken;

    var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

    var jwtSecurityToken = securityToken as JwtSecurityToken;

    if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        throw new SecurityTokenException("Invalid token");

    return principal;
}
}
