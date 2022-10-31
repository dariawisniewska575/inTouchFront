import { toast } from 'react-toastify';
import { ErrorCodes } from 'src/common/enums/ErrorCodes';
import { ErrorResponse } from 'src/common/models/common/responses/ErrorResponse';
import { ErrorTranslations } from '../enums/translations/ErrorTranslations';

export const getApiErrorMessage = (error: ErrorResponse): string | undefined => {
    switch (error.code) {
        case ErrorCodes.Unauthorized:
            return ErrorTranslations.unauthorized;
        case ErrorCodes.ValidationError:
            return ErrorTranslations.validationError;
        case ErrorCodes.NetworkError:
            return ErrorTranslations.networkError;
        case ErrorCodes.TokenExpired:
            return ErrorTranslations.tokenExpired;
        case ErrorCodes.UserAlreadyExists:
            return ErrorTranslations.userAlreadyExists;
        case ErrorCodes.UserNotFound:
            return ErrorTranslations.userNotFound;
        case ErrorCodes.EmailNotConfirmed:
            return ErrorTranslations.emailNotConfirmed;
        default:
            return ErrorTranslations.general;
    }
};

export const handleApiError = (ex: unknown, customMessage?: string): void => {
    const error = ex as ErrorResponse;
    const message = customMessage ? customMessage : getApiErrorMessage(error);
    toast.error(message);
};
