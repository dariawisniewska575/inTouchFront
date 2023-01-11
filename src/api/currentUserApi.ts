import { RefreshTokenRequest } from 'src/common/models/api/auth/requests/RefreshTokenRequest';
import { RefreshUserTokenResponse } from 'src/common/models/api/auth/responses/RefreshUserTokenResponse';
import { User } from 'src/common/models/dto/user/User';
import { authApiClient } from './authApiClient';

const controllerName = 'auth/';

export const getCurrentUserRequest = async (): Promise<User> => {
    const response = await authApiClient.get(controllerName + 'current-user');
    return response.data;
};

export const signOutRequest = async (): Promise<void> => {
    await authApiClient.post(controllerName + 'log-out');
};

export const refreshUserTokenRequest = async (request: RefreshTokenRequest): Promise<RefreshUserTokenResponse> => {
    const response = await authApiClient.get(controllerName + 'refresh-token', { params: request });
    return response.data;
};
