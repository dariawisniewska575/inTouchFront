import { ChatMember } from './ChatMember';

export interface ChatGroup {
    creatorId: string;
    name: string;
    members: ChatMember[];
}
