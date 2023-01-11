import React from 'react';

export interface DashboardChatListModalProps {
    handleClose: () => void;
    setChatId: React.Dispatch<React.SetStateAction<string>>;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
