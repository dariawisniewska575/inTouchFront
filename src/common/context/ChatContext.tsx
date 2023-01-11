import { HubConnection } from '@microsoft/signalr';
import React, { createContext, useMemo, useState } from 'react';
import { PropsWithChildren } from '../models/common/PropsWithChildren';
import { ChatContext as ChatContextModel } from '../models/contexts/ChatContext';

export const ChatContext = createContext<ChatContextModel>({
    setHub: undefined as unknown as React.Dispatch<React.SetStateAction<HubConnection | undefined>>,
    hub: undefined as unknown as HubConnection,
});

const ChatContextWrapper: React.FC<PropsWithChildren> = (props) => {
    const [hub, setHub] = useState<HubConnection>();

    const chatContext: ChatContextModel = useMemo(() => ({ setHub: setHub, hub: hub }), [hub]);

    return <ChatContext.Provider value={chatContext}>{props.children}</ChatContext.Provider>;
};

export default ChatContextWrapper;
