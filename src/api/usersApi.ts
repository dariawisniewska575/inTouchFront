import { User } from 'src/common/models/dto/user/User';
import { authApiClient } from './authApiClient';

const controllerName = 'users';

export const getUsersRequest = async (search: string): Promise<User[]> => {
    const response = await authApiClient.get(controllerName + `?search=${search}`);
    return response.data;
};

export const inviteToFriendsRequest = async (userIdToInvite: string): Promise<void> => {
    await authApiClient.post(controllerName + `/invite-to-friends?userIdToInvite=${userIdToInvite}`);
};

export const getInvitedUsersRequest = async (search: string): Promise<User[]> => {
    const response = await authApiClient.get(controllerName + `/invited-to-friends?search=${search}`);
    return response.data;
};

export const getWaitingsRequest = async (search: string): Promise<User[]> => {
    const response = await authApiClient.get(controllerName + `/friend-requests?search=${search}`);
    return response.data;
};

export const cancelInviteRequest = async (userIdToCancel: string): Promise<void> => {
    await authApiClient.post(controllerName + `/cancel-invite?userIdToCancel=${userIdToCancel}`);
};

export const acceptInviteToFriendRequest = async (userIdToAccept: string): Promise<void> => {
    await authApiClient.post(controllerName + `/accept-invite?userIdToAccept=${userIdToAccept}`);
};

export const rejectInviteToFriendRequest = async (userIdToReject: string): Promise<void> => {
    await authApiClient.post(controllerName + `/reject-invite?userIdToRejest=${userIdToReject}`);
};

export const getFriendsRequest = async (search: string): Promise<User[]> => {
    const response = await authApiClient.get(controllerName + `/friends?search=${search}`);
    return response.data;
};

export const getUserByIdRequest = async (id: string): Promise<User> => {
    const response = await authApiClient.get(controllerName + `/${id}`);
    return response.data;
};

export const addToBlockedRequest = async (userIdToBlock: string): Promise<void> => {
    await authApiClient.post(controllerName + `/block-user?userIdToBlock=${userIdToBlock}`);
};

export const getBlockedUsersRequest = async (search: string): Promise<User[]> => {
    const response = await authApiClient.get(controllerName + `/blacklist?search=${search}`);
    return response.data;
};

export const unblockUserRequest = async (userIdToUnblock: string): Promise<void> => {
    await authApiClient.post(controllerName + `/unblock-user?userIdToUnblock=${userIdToUnblock}`);
};
