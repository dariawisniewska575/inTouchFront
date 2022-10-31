export enum ErrorCodes {
    AxiosTokenCancelled = 2,
    NetworkError = 0,
    GeneralError = -1,
    ValidationError = -2,
    TokenExpired = -3,
    NotValidRequestData = -4,
    EntityNotFound = -5,
    Unauthorized = -6,
    AccessForbidden = -7,

    UserAlreadyExists = -101,
    AddUserException = -102,
    UserNotFound = -103,
    InvalidUserPassword = -104,
    EmailNotConfirmed = -105,
    RefreshTokenFailed = -106,
    AccountAlreadyConfirmed = -107,
}
