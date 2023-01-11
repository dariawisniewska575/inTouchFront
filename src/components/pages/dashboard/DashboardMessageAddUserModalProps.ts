import { ChatUser } from 'src/common/models/dto/chat/ChatUser';

export interface DashboardMessageAddUserModalProps {
    handleClose: () => void;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    chatUsers: ChatUser[];
}
