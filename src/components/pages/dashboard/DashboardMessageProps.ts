import { ChatType } from 'src/common/enums/ChatType';

export interface DashboardMessageProps {
    chatId: string;
    chatUserName: string;
    chatType: ChatType;
}
