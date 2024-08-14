using webapi.Models;

namespace webapi.Services.Interfaces;

public interface IAuthService
{
    public Task<TokenData> LoginUserAsync(SignInUser user);
    public Task<List<User>> GetAllUsersAsync();
    public Task<User> RegisterUserAsync(SignUpUser user);
    public Task<TokenData> RefreshTokenAsync(UserTokenInfo userAccessData);

    public Task LogOutAsync(UserTokenInfo userTokenInfo);
}
