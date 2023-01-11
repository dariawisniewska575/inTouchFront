import { Button, Modal, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { createGroupRequest } from 'src/api/chatApi';
import { getFriendsRequest } from 'src/api/usersApi';
import { UserContext } from 'src/common/context/UserContext';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { ChatMember } from 'src/common/models/dto/chat/ChatMember';
import { User } from 'src/common/models/dto/user/User';
import { colors } from 'src/common/styles/variables/themes/colors';
import { DashboardCreateGroupModalProps } from './DashboardCreateGroupModalProps';
import { DModal } from './DashboardStyles';

const DashboardCreateGroupModal = (props: DashboardCreateGroupModalProps): JSX.Element => {
    const { handleClose, setChatId, setReload } = props;
    const [searchValue, setSearchValue] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [groupName, setGroupName] = useState('');
    const [chatMembers, setChatMembers] = useState<ChatMember[]>([]);
    const userContext = useContext(UserContext);
    const userId = userContext.user?.userId;

    const debounceResults = useMemo(() => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value ?? '');
        };
        return debounce(handleChange, 300);
    }, [setSearchValue]);

    const getUsers = useCallback(async () => {
        try {
            const response = await getFriendsRequest(searchValue);
            setUsers(response);
        } catch (ex) {
            throw handleApiError(ex);
        }
    }, [searchValue]);

    const createGroup = useCallback(async () => {
        try {
            const response = await createGroupRequest({
                creatorId: userId as string,
                name: groupName,
                members: chatMembers,
            });
            setChatId(response);
            handleClose();
            setReload(true);
        } catch (ex) {
            handleApiError(ex);
        }
    }, [chatMembers, groupName, handleClose, setChatId, setReload, userId]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const addChatMembers = (member: ChatMember) => {
        const tmpMembers = [...chatMembers];
        tmpMembers.push(member);
        setChatMembers(tmpMembers);
    };
    return (
        <Modal open onClose={() => handleClose()}>
            <DModal>
                <TextField
                    onChange={debounceResults}
                    placeholder={'Wyszukaj...'}
                    fullWidth
                    style={{ margin: '10px', padding: '10px' }}
                />
                <TextField
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder={'Wpisz nazwe grupy'}
                    fullWidth
                    style={{ margin: '10px', padding: '10px' }}
                />
                {users.length > 0 ? (
                    users?.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                background: chatMembers.find((member) => member.id === user.id)
                                    ? colors.lightBlue
                                    : colors.lightBlueOpacity,
                                margin: '16px',
                                padding: '10px',
                                borderRadius: '20px',
                            }}
                        >
                            <div
                                style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                                onClick={() => addChatMembers({ email: user.email, id: user.id })}
                            >
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>
                                <GoPrimitiveDot color={user.isLogged ? 'green' : 'gray'} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ margin: '10px', padding: '10px' }}>Brak przyjaciół, dodaj nowych!</div>
                )}
                {users.length > 0 && chatMembers.length > 2 && (
                    <Button onClick={() => createGroup()}>Utwórz grupę</Button>
                )}
            </DModal>
        </Modal>
    );
};

export default DashboardCreateGroupModal;
