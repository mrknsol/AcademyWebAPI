using webapi.Models;
using System.Security.Claims;

namespace webapi.Services.Interfaces;

public interface ITokenService
{
    public Task<string> GenerateTokenAsync(User user);
    public Task<string> GenerateRefreshTokenAsync();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

}
