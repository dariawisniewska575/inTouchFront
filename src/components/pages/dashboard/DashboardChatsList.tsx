import { Box, Button } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { colors } from 'src/common/styles/variables/themes/colors';
import { getChatsRequest } from 'src/api/chatApi';
import { Chat } from 'src/common/models/dto/chat/Chat';

import DashboardChatListModal from './DashboardChatListModal';
import { DashboardChatsListProps } from './DashboardChatsListProps';
import DashboardAddFriendsModal from './DashboardAddFriendsModal';
import { UserContext } from 'src/common/context/UserContext';
import DashboardCreateGroupModal from './DashboardCreateGroupModal';
import { ChatType } from 'src/common/enums/ChatType';
const DashboardChatsList = (props: DashboardChatsListProps): JSX.Element => {
    const { setChatId, setChatUserName, setChatType } = props;
    const [chats, setChats] = useState<Chat[]>([]);
    const [open, setOpen] = useState(false);
    const [addFrendsOpen, setAddFrendsOpen] = useState(false);
    const userContext = useContext(UserContext);
    const userId = userContext.user?.userId;
    const [reload, setReload] = useState(false);
    const [reloadGroup, setReloadGroup] = useState(false);
    const [createGroupOpen, setCreateGroupOpen] = useState(false);

    const getChats = useCallback(async () => {
        try {
            const response = await getChatsRequest();
            setChats(response);
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    useEffect(() => {
        getChats();
        if (reload || reloadGroup) getChats();
    }, [getChats, reload, reloadGroup]);

    const handleCloseModal = () => {
        setOpen(false);
        setAddFrendsOpen(false);
        setCreateGroupOpen(false);
    };

    const setChatAndUserHandle = (chatId: string, userName: string, chatType: ChatType) => {
        setChatId(chatId);
        setChatUserName(userName);
        setChatType(chatType);
    };
    return (
        <>
            <Box style={{ width: '20%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Button onClick={() => setAddFrendsOpen(true)}>Dodaj znajomych</Button>
                <Button onClick={() => setOpen(true)}>Utwórz nowy chat</Button>
                <Button onClick={() => setCreateGroupOpen(true)}>Utwórz grupę</Button>
                {chats?.length === 0 ? (
                    <div>Lista chatów jest pusta</div>
                ) : (
                    chats?.map((chat) => (
                        <div
                            key={chat.id}
                            style={{
                                background: colors.lightBlueOpacity,
                                margin: '16px',
                                padding: '10px',
                                borderRadius: '20px',
                            }}
                        >
                            <div
                                style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                                onClick={() =>
                                    setChatAndUserHandle(
                                        chat.id,
                                        chat.type.toString() === 'PRIVATE'
                                            ? (chat.users
                                                  .find((member) => member.userId !== (userId as string))
                                                  ?.user.firstName.concat(
                                                      ' '.concat(
                                                          chat.users.find(
                                                              (member) => member.userId !== (userId as string),
                                                          )?.user.lastName ?? '',
                                                      ),
                                                  ) as string)
                                            : chat.name,
                                        chat.type,
                                    )
                                }
                            >
                                <div>
                                    {chat.type.toString() === 'PRIVATE'
                                        ? chat.users
                                              .find((member) => member.userId !== (userId as string))
                                              ?.user.firstName.concat(
                                                  ' '.concat(
                                                      chat.users.find((member) => member.userId !== (userId as string))
                                                          ?.user.lastName ?? '',
                                                  ),
                                              )
                                        : chat.name}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </Box>
            {open && (
                <DashboardChatListModal
                    handleClose={() => handleCloseModal()}
                    setChatId={setChatId}
                    setReload={setReload}
                />
            )}
            {addFrendsOpen && <DashboardAddFriendsModal handleClose={() => handleCloseModal()} />}
            {createGroupOpen && (
                <DashboardCreateGroupModal
                    handleClose={() => handleCloseModal()}
                    setChatId={setChatId}
                    setReload={setReloadGroup}
                />
            )}
        </>
    );
};

export default DashboardChatsList;
