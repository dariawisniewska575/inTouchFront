import { Modal } from '@mui/material';
import React, { useCallback } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { colors } from 'src/common/styles/variables/themes/colors';
import { DashboardMessagesRemoveUserModalProps } from './DashboardMessagesRemoveUserModalProps';
import { DModal } from './DashboardStyles';

const DashboardMessagesRemoveUserModal = (props: DashboardMessagesRemoveUserModalProps): JSX.Element => {
    const { handleClose, chatUsers, userId, setUserToRemoveId } = props;

    const handleSetUserToRemoveId = useCallback(
        (userId: string) => {
            setUserToRemoveId(userId);
            handleClose();
        },
        [handleClose, setUserToRemoveId],
    );
    return (
        <Modal open onClose={() => handleClose()}>
            <DModal>
                {chatUsers?.map(
                    (user) =>
                        user.userId !== userId && (
                            <div
                                key={user.userId}
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
                                    onClick={() => handleSetUserToRemoveId(user.userId)}
                                    style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                                >
                                    <div>
                                        {user.user.firstName} {user.user.lastName}
                                    </div>
                                    <GoPrimitiveDot
                                        color={user.user.isLogged ? 'green' : 'gray'}
                                        style={{ margin: '4px' }}
                                    />
                                </div>
                            </div>
                        ),
                )}
            </DModal>
        </Modal>
    );
};

export default DashboardMessagesRemoveUserModal;
