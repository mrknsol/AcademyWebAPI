
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.Interfaces;
using webapi.Validators;

namespace webapi.Controllers;


[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly LoginUserValidator loginValidator;
    private readonly RegisterUserValidator registerValidator;
    private readonly IAuthService authService;


    public AuthController(LoginUserValidator loginValidator, RegisterUserValidator registerValidator, IAuthService authService)
    {
        this.loginValidator = loginValidator;
        this.registerValidator = registerValidator;
        this.authService = authService;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> LoginAsync([FromBody] SignInUser user)
    {

        var validationResult = loginValidator.Validate(user);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        try
        {
            var res = await authService.LoginUserAsync(user);

            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex.Message}\n{ex}");
        }
    }
    [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var users = await authService.GetAllUsersAsync();
            return Ok(users);
        }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterAsync([FromBody] SignUpUser user)
    {
        try
        {
            var validationResult = registerValidator.Validate(user);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            var res = await authService.RegisterUserAsync(user);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex.Message}\n{ex}");
        }
    }


    [HttpPost("Refresh")]
    public async Task<IActionResult> RefreshTokenAsync(UserTokenInfo refresh)
    {
        try
        {
            var newToken = await authService.RefreshTokenAsync(refresh);

            if (newToken is null)
                return BadRequest("Invalid token");

            return Ok(newToken);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex.Message}\n{ex}");
        }

    }


    [Authorize]
    [HttpPost("Logout")]
    public async Task<IActionResult> LogoutAsync(UserTokenInfo logout)
    {
        try
        {
            await authService.LogOutAsync(logout);
            return Ok("Logged out successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
