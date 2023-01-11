import { Modal, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getUsersRequest, inviteToFriendsRequest } from 'src/api/usersApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { User } from 'src/common/models/dto/user/User';
import { colors } from 'src/common/styles/variables/themes/colors';
import { DashboardAddFriendsModalProps } from './DashboardAddFriendsModalProps';
import { DModal } from './DashboardStyles';

const DashboardAddFriendsModal = (props: DashboardAddFriendsModalProps): JSX.Element => {
    const { handleClose } = props;
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
            const response = await getUsersRequest(searchValue);
            setUsers(response);
        } catch (ex) {
            handleApiError(ex);
        }
    }, [searchValue]);

    const inviteUserHandle = useCallback(
        async (userId: string) => {
            try {
                await inviteToFriendsRequest(userId);
                toast.success('Wysłano zaproszenie');
                handleClose();
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [handleClose],
    );

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <Modal open onClose={() => handleClose()}>
            <DModal>
                <TextField
                    onChange={debounceResults}
                    placeholder={'Wyszukaj...'}
                    fullWidth
                    style={{ margin: '10px', padding: '10px' }}
                />
                {users?.map((user) => (
                    <div
                        onClick={() => inviteUserHandle(user.id)}
                        key={user.id}
                        style={{
                            background: colors.lightBlueOpacity,
                            margin: '16px',
                            padding: '10px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        <div>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                ))}
            </DModal>
        </Modal>
    );
};

export default DashboardAddFriendsModal;
