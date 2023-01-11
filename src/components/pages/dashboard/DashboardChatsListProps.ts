import React, { SetStateAction } from 'react';
import { ChatType } from 'src/common/enums/ChatType';

export interface DashboardChatsListProps {
    setChatId: React.Dispatch<SetStateAction<string>>;
    setChatUserName: React.Dispatch<SetStateAction<string>>;
    setChatType: React.Dispatch<SetStateAction<ChatType>>;
}
