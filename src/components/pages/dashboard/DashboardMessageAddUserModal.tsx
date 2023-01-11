import { Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { getFriendsRequest } from 'src/api/usersApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { User } from 'src/common/models/dto/user/User';
import { colors } from 'src/common/styles/variables/themes/colors';
import { DashboardMessageAddUserModalProps } from './DashboardMessageAddUserModalProps';
import { DModal } from './DashboardStyles';

const DashboardMessageAddUserModal = (props: DashboardMessageAddUserModalProps): JSX.Element => {
    const { handleClose, setUserId, chatUsers } = props;
    const [users, setUsers] = useState<User[]>([]);

    const getFriends = useCallback(async () => {
        try {
            const request = await getFriendsRequest('');
            const users = request.filter(
                (user) => chatUsers.find((chatUser) => chatUser.userId === user.id)?.userId !== user.id,
            );
            setUsers(users);
        } catch (ex) {
            handleApiError(ex);
        }
    }, [chatUsers]);

    useEffect(() => {
        getFriends();
    }, [getFriends]);

    const handleSetUserId = useCallback(
        (userId: string) => {
            setUserId(userId);
            handleClose();
        },
        [handleClose, setUserId],
    );
    return (
        <Modal open onClose={() => handleClose()}>
            <DModal>
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
                                onClick={() => handleSetUserId(user.id)}
                                style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                            >
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>
                                <GoPrimitiveDot color={user.isLogged ? 'green' : 'gray'} style={{ margin: '4px' }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ margin: '10px', padding: '10px' }}>Brak przyjaciół, dodaj nowych!</div>
                )}
            </DModal>
        </Modal>
    );
};

export default DashboardMessageAddUserModal;
