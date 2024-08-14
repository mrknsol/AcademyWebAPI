using System.Text.RegularExpressions;

namespace webapi.Validators;

public class RegexPatterns
{
    public const string NamePattern = @"(?=.*[A-Z])(?=.*[a-z]).{5,}";
    public const string SurnamePattern = @"(?=.*[A-Z])(?=.*[a-z]).{5,}";
    public const string emailPattern = @"^[^\s@]+@[^\s@]+\.[^\s@]+$";
    public const string passwordPattern = @"(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}";
}
