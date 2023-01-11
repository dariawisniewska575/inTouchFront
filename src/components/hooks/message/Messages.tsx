import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useContext, useMemo } from 'react';
import { ChatContext } from 'src/common/context/ChatContext';

const Messages: React.FC = () => {
    const { setHub, hub } = useContext(ChatContext);
    const hubConnection = new HubConnectionBuilder()
        .withUrl('https://api-in-touch.azurewebsites.net/chatHub', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
        })
        .build();
    useMemo(() => {
        (async () => {
            if (!hub) {
                await hubConnection.start();
                setHub(hubConnection);
            }
        })();
    }, [hub, hubConnection, setHub]);

    return null;
};

export default Messages;
