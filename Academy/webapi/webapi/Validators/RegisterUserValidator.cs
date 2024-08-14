using webapi.Models;
using FluentValidation;

namespace webapi.Validators;

public class RegisterUserValidator : AbstractValidator<SignUpUser>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required")
            .Matches(RegexPatterns.NamePattern)
            .When(x => x.Name != null);
        
        RuleFor(x => x.Surname)
            .NotEmpty()
            .WithMessage("Name is required")
            .Matches(RegexPatterns.SurnamePattern)
            .When(x => x.Surname != null);

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required")
            .EmailAddress()
            .WithMessage("Valid Email is required");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required")
            .Matches(RegexPatterns.passwordPattern)
            .When(x => x.Password != null);

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty()
            .WithMessage("Confirm Password is required")
            .Equal(x => x.Password)
            .WithMessage("Password and Confirm Password must match");
    }
}
