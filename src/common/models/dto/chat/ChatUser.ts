import { User } from '../user/User';
import { Chat } from './Chat';

export interface ChatUser {
    chatId: string;
    userId: string;
    chat: Chat;
    user: User;
}
