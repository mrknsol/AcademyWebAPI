using webapi.Models;
using FluentValidation;

namespace webapi.Validators;

public class LoginUserValidator : AbstractValidator<SignInUser>
{
    public LoginUserValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required")
            .Matches(RegexPatterns.emailPattern)
            .When(x => x.Email != null);

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required")
            .Matches(RegexPatterns.passwordPattern)
            .When(x => x.Password != null);
    }
}
