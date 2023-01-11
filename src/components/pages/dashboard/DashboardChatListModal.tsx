import { debounce, Modal, TextField } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { User } from 'src/common/models/dto/user/User';
import { colors } from 'src/common/styles/variables/themes/colors';
import { DashboardChatListModalProps } from './DashboardChatListModalProps';
import { DModal } from './DashboardStyles';
import { GoPrimitiveDot } from 'react-icons/go';
import { addToBlockedRequest, getFriendsRequest } from 'src/api/usersApi';
import { createChatRequest } from 'src/api/chatApi';
import { MdBlockFlipped } from 'react-icons/md';
import { toast } from 'react-toastify';
const DashboadChatListModal = (props: DashboardChatListModalProps): JSX.Element => {
    const { handleClose, setChatId, setReload } = props;
    const [searchValue, setSearchValue] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);

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
            handleApiError(ex);
        }
    }, [searchValue, setUsers]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const createChat = useCallback(
        async (email: string) => {
            try {
                const response = await createChatRequest(email);
                setChatId(response);
                handleClose();
                setReload(true);
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [handleClose, setChatId, setReload],
    );

    const blockUser = useCallback(
        async (userId: string) => {
            try {
                await addToBlockedRequest(userId);
                toast.success('Użytkownik zablokowany');
                getUsers();
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [getUsers],
    );
    return (
        <Modal open onClose={() => handleClose()}>
            <DModal>
                <TextField
                    onChange={debounceResults}
                    placeholder={'Wyszukaj...'}
                    fullWidth
                    style={{ margin: '10px', padding: '10px' }}
                />
                {users.length > 0 ? (
                    users?.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                background: colors.lightBlueOpacity,
                                margin: '16px',
                                padding: '10px',
                                borderRadius: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                onClick={() => createChat(user.email)}
                                style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                            >
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>
                                <GoPrimitiveDot color={user.isLogged ? 'green' : 'gray'} style={{ margin: '4px' }} />
                            </div>
                            <MdBlockFlipped
                                color={'red'}
                                style={{ margin: '4px' }}
                                onClick={() => blockUser(user.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ margin: '10px', padding: '10px' }}>Brak przyjaciół, dodaj nowych!</div>
                )}
            </DModal>
        </Modal>
    );
};

export default DashboadChatListModal;
