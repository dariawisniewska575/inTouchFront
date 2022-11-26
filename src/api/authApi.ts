import { CreateAccountRequest } from 'src/common/models/api/auth/requests/CreateAccountRequest';
import { ResetPasswordRequest } from 'src/common/models/api/auth/requests/ResetPasswordRequest';
import { SendPasswordResetLinkRequest } from 'src/common/models/api/auth/requests/SendPasswordResetLinkRequest';
import { SignInRequest } from 'src/common/models/api/auth/requests/SignInRequest';
import { SignInResponse } from 'src/common/models/api/auth/responses/SignInResponse';
import { authApiClient } from './authApiClient';

const controllerName = 'auth';

export const signInRequest = async (request: SignInRequest): Promise<SignInResponse> => {
    const response = await authApiClient.post(controllerName + '/log-in', request);
    return response.data;
};

export const createAccountRequest = async (request: CreateAccountRequest): Promise<void> => {
    await authApiClient.post(controllerName + '/registration', request);
};

export const resetPasswordRequest = async (request: ResetPasswordRequest): Promise<void> => {
    await authApiClient.post(controllerName + '/reset-password', request);
};

export const sendPasswordResetLinkRequest = async (request: SendPasswordResetLinkRequest): Promise<void> => {
    await authApiClient.post(controllerName + '/forgot-password', request);
};

export const confirmEmailRequest = async (userId: string, emailConfirmationToken: string): Promise<void> => {
    await authApiClient.get(
        controllerName + `/confirm-registration?userId=${userId}&emailConfirmationToken=${emailConfirmationToken} `,
    );
};
