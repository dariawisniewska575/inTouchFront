import React from 'react';
import { ChatUser } from 'src/common/models/dto/chat/ChatUser';

export interface DashboardMessagesRemoveUserModalProps {
    handleClose: () => void;
    chatUsers: ChatUser[];
    userId: string;
    setUserToRemoveId: React.Dispatch<React.SetStateAction<string>>;
}
