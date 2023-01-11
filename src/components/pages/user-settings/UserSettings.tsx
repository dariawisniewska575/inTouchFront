import { Button, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { updateAccountRequest } from 'src/api/accountApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import UserSettingsAvatar from './UserSettingsAvatar';
import UserSettingsEmail from './UserSettingsEmail';
import UserSettingsPassword from './UserSettingsPassword';
import UserSettingsRemoveAccountModal from './UserSettingsRemoveAccountModal';
import { USContainer, USSmallBox, USSmallBoxContainer } from './UserSettingStyles';

const UserSettings: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [open, setOpen] = useState(false);

    const handleUpdateAccount = useCallback(async () => {
        try {
            await updateAccountRequest({ firstName: name, lastName: lastName });
            toast.success('Dane zostały zaaktualizowane, odswież stronę');
        } catch (ex) {
            handleApiError(ex);
        }
    }, [lastName, name]);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <USContainer>
            <USSmallBoxContainer>
                <USSmallBox sx={{ mt: 1 }}>
                    <TextField label="Imię" onChange={(e) => setName(e.target.value)} />
                    <TextField label="Nazwisko" onChange={(e) => setLastName(e.target.value)} />
                    <Button onClick={() => handleUpdateAccount()}>Zmień</Button>
                </USSmallBox>
                <UserSettingsPassword />
            </USSmallBoxContainer>
            <USSmallBoxContainer>
                <UserSettingsEmail />
                <UserSettingsAvatar />
            </USSmallBoxContainer>
            <USSmallBoxContainer>
                <USSmallBox>
                    <Button color="error" onClick={() => setOpen(true)}>
                        Usuń konto
                    </Button>
                </USSmallBox>
            </USSmallBoxContainer>
            {open && <UserSettingsRemoveAccountModal handleClose={handleClose} />}
        </USContainer>
    );
};

export default UserSettings;
