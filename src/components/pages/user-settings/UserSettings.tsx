import { Button, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { updateAccountRequest } from 'src/api/accountApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import DefaultDropzone from 'src/components/common/stateless/default-dropzone/DefaultDropzone';
import UserSettingsEmail from './UserSettingsEmail';
import UserSettingsPassword from './UserSettingsPassword';
import { USContainer, USSmallBox, USSmallBoxContainer } from './UserSettingStyles';

const UserSettings: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUpdateAccount = useCallback(async () => {
        try {
            await updateAccountRequest({ firstName: name, lastName: lastName });
            toast.success('Dane zostały zaaktualizowane, odswież stronę');
        } catch (ex) {
            handleApiError(ex);
        }
    }, [lastName, name]);

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
                <USSmallBox sx={{ mt: 1 }}>
                    <DefaultDropzone />
                </USSmallBox>
            </USSmallBoxContainer>
        </USContainer>
    );
};

export default UserSettings;
