import { Button, Modal, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { deleteAccountRequest } from 'src/api/accountApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { DModal } from '../dashboard/DashboardStyles';
import { UserSettingsRemoveAccountModalProps } from './UserSettingsRemoveAccountModalProps';

const UserSettingsRemoveAccountModal = (props: UserSettingsRemoveAccountModalProps): JSX.Element => {
    const { handleClose } = props;
    const [password, setPassword] = useState('');

    const handleRemoveAccount = useCallback(async () => {
        try {
            await deleteAccountRequest({ password: password });
        } catch (ex) {
            handleApiError(ex);
        }
    }, [password]);

    return (
        <Modal open onClose={handleClose}>
            <DModal>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField type={'password'} label={'Wpisz hasło'} onChange={(e) => setPassword(e.target.value)} />
                    <Button
                        disabled={password === '' ? true : false}
                        color="error"
                        onClick={() => handleRemoveAccount()}
                    >
                        Usuń konto
                    </Button>
                </div>
            </DModal>
        </Modal>
    );
};

export default UserSettingsRemoveAccountModal;
