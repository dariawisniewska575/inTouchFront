import { HubConnection } from '@microsoft/signalr';

export interface MessageProps {
    send: (hub: HubConnection) => void;
}
