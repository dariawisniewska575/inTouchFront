export interface ChangePasswordRequest {
    email?: string;
    newPassword: string;
    oldPassword: string;
}
