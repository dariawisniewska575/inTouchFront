import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Button } from '@mui/material';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChatContext } from 'src/common/context/ChatContext';

const Messages: React.FC = () => {
    const { setHub, hub } = useContext(ChatContext);
    const [a, setA] = useState(false);
    const hubConnection = new HubConnectionBuilder().withUrl('https://localhost:7005/chatHub').build();
    useMemo(() => {
        (async () => {
            await hubConnection.start();
            setHub(hubConnection);
        })();
    }, []);

    return null;
};

export default Messages;
