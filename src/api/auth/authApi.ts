import { CreateAccountRequest } from 'src/common/models/api/auth/requests/CreateAccountRequest';
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
