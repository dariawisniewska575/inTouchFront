import { ChatType } from 'src/common/enums/ChatType';
import { ChatUser } from './ChatUser';
import { Message } from './Message';

export interface Chat {
    id: string;
    name: string;
    type: ChatType;
    creatorId: string;
    messages: Message[];
    users: ChatUser[];
}
