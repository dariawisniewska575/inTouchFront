import { ChangeEmailRequest } from 'src/common/models/api/auth/requests/ChangeEmailRequest';
import { ChangePasswordRequest } from 'src/common/models/api/auth/requests/ChangePasswordRequest';
import { UpdateAccountRequest } from 'src/common/models/api/auth/requests/UpdateAccountRequest';
import { authApiClient } from './authApiClient';

const controllerName = 'user/account/';

export const changePasswordRequest = async (request: ChangePasswordRequest): Promise<void> => {
    await authApiClient.post(controllerName + 'change-password', request);
};

export const changeEmailRequest = async (request: ChangeEmailRequest): Promise<void> => {
    await authApiClient.post(authApiClient + 'change-email', request);
};

export const updateAccountRequest = async (request: UpdateAccountRequest): Promise<void> => {
    await authApiClient.put(controllerName, request);
};

// export const deleteAccountRequest = async (request: DeleteAccountRequest): Promise<void> => {
//     await authApiClient.delete(controllerName, request);
// };
