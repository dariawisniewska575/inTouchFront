import { objectToFormData } from 'src/common/helpers/formDataHelper';
import { ChangeAvatarRequest } from 'src/common/models/api/auth/requests/ChangeAvatarRequest';
import { ChangeEmailRequest } from 'src/common/models/api/auth/requests/ChangeEmailRequest';
import { ChangePasswordRequest } from 'src/common/models/api/auth/requests/ChangePasswordRequest';
import { DeleteAccountRequest } from 'src/common/models/api/auth/requests/DeleteAccountRequest';
import { UpdateAccountRequest } from 'src/common/models/api/auth/requests/UpdateAccountRequest';
import { authApiClient } from './authApiClient';

const controllerName = 'user/account/';

export const changePasswordRequest = async (request: ChangePasswordRequest): Promise<void> => {
    await authApiClient.post(controllerName + 'change-password', request);
};

export const changeEmailRequest = async (request: ChangeEmailRequest): Promise<void> => {
    await authApiClient.post(controllerName + 'change-email', request);
};

export const updateAccountRequest = async (request: UpdateAccountRequest): Promise<void> => {
    await authApiClient.put(controllerName, request);
};

export const deleteAccountRequest = async (request: DeleteAccountRequest): Promise<void> => {
    await authApiClient.delete(controllerName, { data: request });
};

export const changeAvatarRequest = async (request: ChangeAvatarRequest): Promise<void> => {
    await authApiClient.post(controllerName + 'change-avatar', objectToFormData(request), {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: request,
    });
};
