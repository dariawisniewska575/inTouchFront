export interface Message {
    content: string;
    chatId: string;
    senderId: string;
    senderName: string;
    sendedAt?: Date;
    fileSource: string;
}
