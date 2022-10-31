import { User } from 'src/common/models/dto/user/User';
import { authApiClient } from './authApiClient';

const controllerName = 'currentUser/';

// export const changeUserPasswordRequest = async (request: ChangeUserPasswordRequest): Promise<void> => {
//     await authApiClient.post(controllerName + 'change-password', request);
// };

export const getCurrentUserRequest = async (): Promise<User> => {
    const response = await authApiClient.get(controllerName + 'get-current-user');
    return response.data;
};

export const signOutRequest = async (): Promise<void> => {
    await authApiClient.post(controllerName + 'sign-out');
};

// export const refreshUserTokenRequest = async (): Promise<RefreshUserTokenResponse> => {
//     const response = await authApiClient.get(controllerName + 'refresh-user-token');
//     return response.data;
// };
