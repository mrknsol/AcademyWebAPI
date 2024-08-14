namespace webapi.Exceptions;

public enum AuthErrorTypes
{
    InvalidToken,
    InvalidRefreshToken,
    InvalidCredentials,
    UserNotFound,
    InvalidRequest
}
