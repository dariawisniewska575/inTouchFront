import { Button, Menu, MenuItem, TextField, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getChatRequest, sendFileRequest } from 'src/api/chatApi';
import { ChatContext } from 'src/common/context/ChatContext';
import { UserContext } from 'src/common/context/UserContext';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { Message } from 'src/common/models/dto/chat/Message';
import { colors } from 'src/common/styles/variables/themes/colors';
import { DashboardMessageProps } from './DashboardMessageProps';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IconButton } from '@mui/material';
import DashboardMessageAddUserModal from './DashboardMessageAddUserModal';
import { ChatUser } from 'src/common/models/dto/chat/ChatUser';
import DashboardMessagesRemoveUserModal from './DashboardMessagesRemoveUserModal';
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';
import PrivateComponent from 'src/components/common/stateful/private-component/PrivateComponent';

const DashboardMessage = (props: DashboardMessageProps): JSX.Element => {
    const chatContextd = useContext(ChatContext);
    const { chatId, chatUserName, chatType } = props;
    const [messages, setMessages] = useState<Message[]>([]);
    const [sendedMessage, setSendedMessage] = useState('');
    const userContext = useContext(UserContext);
    const userId = userContext.user?.userId;
    const userName = userContext.user?.userDetails?.firstName;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [openAddUser, setOpenAddUser] = useState(false);
    const [openRemoveUser, setOpenRemoveUser] = useState(false);
    const [fileSource, setFileSource] = useState('');
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
    const [fileName, setFileName] = useState('');
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [members, setMembers] = useState<ChatUser[]>([]);
    const [addFriendId, setAddFriendId] = useState('');
    const [removeFriendId, setRemoveFriendId] = useState('');
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const getChat = useCallback(async () => {
        try {
            const response = await getChatRequest(chatId);
            setMembers(response.users);
            response.messages.map(
                (message) =>
                    (message.senderName = response.users.find((user) => user.userId === message.senderId)?.user
                        .firstName as string),
            );
            setMessages(response.messages);
        } catch (ex) {
            handleApiError(ex);
        }
    }, [chatId]);

    useEffect(() => {
        if (chatId !== '') getChat();
    }, [chatId, getChat]);

    const sendMessage = useCallback(() => {
        const message = {
            chatId: chatId,
            content: fileSource === '' ? sendedMessage : fileName,
            senderId: userId,
            senderName: userName,
            fileSource: fileSource,
        };
        chatContextd.hub?.invoke('SendMessageAsync', message);
        setSendedMessage('');
        setFileSource('');
        setFileName('');
    }, [chatContextd.hub, chatId, fileName, fileSource, sendedMessage, userId, userName]);

    const handleKeyEnterToSend = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        },
        [sendMessage],
    );

    useEffect(() => {
        chatContextd.hub?.invoke('OpenChat', chatId);
        chatContextd.hub?.on(
            'ReceiveMessage',
            (userId: string, userName: string, newMessage: string, source: string) => {
                const tmpMessages = [...messages];
                tmpMessages.push({
                    chatId: chatId,
                    content: newMessage,
                    senderId: userId,
                    senderName: userName,
                    sendedAt: new Date(Date.now()),
                    fileSource: source,
                });
                setMessages(tmpMessages);
            },
        );
    }, [chatContextd.hub, chatId, messages, sendedMessage, userName]);

    const getSendedDate = (date: Date) => {
        return new Date(date).toLocaleDateString() + ', ' + new Date(date).toLocaleTimeString();
    };

    const handleCloseModal = () => {
        setOpenAddUser(false);
        setOpenRemoveUser(false);
    };
    const addUserToChat = useCallback(() => {
        chatContextd.hub?.invoke('AddUserToGroupChat', chatId, userId, addFriendId);
        setAddFriendId('');
    }, [addFriendId, chatContextd.hub, chatId, userId]);

    const removeUserFromChat = useCallback(() => {
        chatContextd.hub?.invoke('RemoveUserFromGroupChat', chatId, userId, removeFriendId);
        setRemoveFriendId('');
    }, [chatContextd.hub, chatId, removeFriendId, userId]);

    const leaveChat = useCallback(() => {
        chatContextd.hub?.invoke('LeaveGroupChat', chatId, userId);
        window.location.reload();
    }, [chatContextd.hub, chatId, userId]);
    useEffect(() => {
        if (addFriendId !== '') addUserToChat();
        if (removeFriendId !== '') removeUserFromChat();
    }, [addFriendId, addUserToChat, removeFriendId, removeUserFromChat]);

    const sendFile = useCallback(async () => {
        try {
            const response = await sendFileRequest({ file: acceptedFiles[0] });
            setFileName(acceptedFiles[0].name);
            setFileSource(response);
        } catch (ex) {
            handleApiError(ex);
        }
    }, [acceptedFiles]);

    useEffect(() => {
        if (acceptedFiles[0]) sendFile();
    }, [acceptedFiles, sendFile]);
    return (
        <PrivateComponent>
            {chatId === '' ? (
                <div
                    style={{
                        width: '100%',
                        margin: '20px',
                    }}
                ></div>
            ) : (
                <div
                    style={{
                        width: '100%',
                        background: colors.lightBlue,
                        margin: '20px',
                        height: '700px',
                        borderRadius: ' 30px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            color: 'black',
                            margin: '20px 30px 0px',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {chatUserName}
                        {chatType.toString() === 'GROUP' && (
                            <>
                                <IconButton aria-label="open drawer" onClick={handleOpenMenu}>
                                    <HiOutlineDotsHorizontal />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                                    {}
                                    <MenuItem onClick={() => setOpenAddUser(true)}>Dodaj użytkownika</MenuItem>
                                    <MenuItem onClick={() => setOpenRemoveUser(true)}>Usuń użytkownika</MenuItem>
                                    <MenuItem onClick={() => leaveChat()} style={{ color: 'red' }}>
                                        Opuść chat
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
                    <div
                        style={{
                            height: '90%',
                            background: colors.white,
                            margin: '30px',
                            maxHeight: '600px',
                            overflowY: 'auto',
                        }}
                    >
                        {messages &&
                            messages.map((message, x) =>
                                message.senderId === 'ChatBot' ? (
                                    <div style={{ display: 'flex', justifyContent: 'center' }} key={x}>
                                        <Typography variant="caption">{message.content}</Typography>
                                    </div>
                                ) : (
                                    <div
                                        key={x}
                                        style={{
                                            display: 'flex',
                                            justifyContent: message.senderId === userId ? 'right' : 'left',
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', margin: '4px' }}>
                                            <Typography variant="caption">
                                                {message.senderId !== userId && message.senderName}{' '}
                                                {getSendedDate(message.sendedAt as Date)}
                                            </Typography>
                                            <div
                                                style={{
                                                    background:
                                                        message.senderId === userId
                                                            ? colors.lightBlue
                                                            : colors.lightBlueOpacity,
                                                    margin: '0px 10px',
                                                    marginBottom: '10px',
                                                    padding: '16px',
                                                    borderRadius: '20px',
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                {message.fileSource !== '' ? (
                                                    <a target="_blank" href={message.fileSource} rel="noreferrer">
                                                        {message.content}
                                                    </a>
                                                ) : (
                                                    message.content
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                    </div>
                    <div
                        style={{
                            margin: '14px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <div style={{ background: 'white', borderRadius: '20px', width: '80%' }}>
                            <TextField
                                autoComplete="off"
                                fullWidth
                                value={fileName !== '' ? fileName : sendedMessage}
                                onChange={(e) => setSendedMessage(e.target.value)}
                                onKeyDown={(e) => handleKeyEnterToSend(e)}
                            />
                        </div>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <BsFillFileEarmarkPlusFill size={'50px'} style={{ color: 'white', cursor: 'pointer' }} />
                        </div>
                        <Button variant="contained" style={{ background: colors.white }} onClick={() => sendMessage()}>
                            Wyślij
                        </Button>
                    </div>
                </div>
            )}
            {openAddUser && (
                <DashboardMessageAddUserModal
                    handleClose={handleCloseModal}
                    setUserId={setAddFriendId}
                    chatUsers={members}
                />
            )}
            {openRemoveUser && (
                <DashboardMessagesRemoveUserModal
                    handleClose={handleCloseModal}
                    chatUsers={members}
                    userId={userId as string}
                    setUserToRemoveId={setRemoveFriendId}
                />
            )}
        </PrivateComponent>
    );
};

export default DashboardMessage;
