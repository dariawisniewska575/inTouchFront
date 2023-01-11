import { HubConnection } from '@microsoft/signalr';

export interface ChatContext {
    hub?: HubConnection;
    setHub: React.Dispatch<React.SetStateAction<HubConnection | undefined>>;
}
