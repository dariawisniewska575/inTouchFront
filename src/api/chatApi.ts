import { objectToFormData } from 'src/common/helpers/formDataHelper';
import { SendFileRequest } from 'src/common/models/api/auth/requests/SendFileRequest';
import { Chat } from 'src/common/models/dto/chat/Chat';
import { ChatGroup } from 'src/common/models/dto/chat/ChatGroup';
import { Message } from 'src/common/models/dto/chat/Message';
import { authApiClient } from './authApiClient';

const controllerName = 'chat/';

export const getChatsRequest = async (): Promise<Chat[]> => {
    const response = await authApiClient.get(controllerName);
    return response.data;
};

export const sendMessageRequest = async (request: Message): Promise<void> => {
    await authApiClient.post(controllerName + 'send-message', request);
};

export const createChatRequest = async (recipientEmail: string): Promise<string> => {
    recipientEmail = recipientEmail.replace('%40', '@');
    const response = await authApiClient.post(controllerName + `private/create?recipientEmail=${recipientEmail}`);
    return response.data;
};

export const getChatRequest = async (chatId: string): Promise<Chat> => {
    const response = await authApiClient.get(controllerName + `${chatId}`);
    return response.data;
};

export const createGroupRequest = async (request: ChatGroup): Promise<string> => {
    const response = await authApiClient.post(controllerName + 'group/create', request);
    return response.data;
};

export const sendFileRequest = async (file: SendFileRequest): Promise<string> => {
    const response = await authApiClient.post(controllerName + 'send-file', objectToFormData(file), {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: file,
    });
    return response.data;
};
