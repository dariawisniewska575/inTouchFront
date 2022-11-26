import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { changeEmailRequest } from 'src/api/accountApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import { emailValidationSchema } from 'src/common/validation-schemas/emailValidationSchema';
import { USSmallBox } from './UserSettingStyles';
interface Email {
    email: string;
}
const UserSettingsEmail = (): JSX.Element => {
    const emailValidation = useMemo(() => emailValidationSchema(), []);

    const {
        handleSubmit,
        register,
        formState: { isValid, errors },
    } = useForm<Email>({ resolver: yupResolver(emailValidation), mode: 'onChange' });

    const handleChangeEmail = useCallback(async (data: Email) => {
        try {
            await changeEmailRequest({ email: data.email });
            toast.success('Email został zmieniony');
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    return (
        <USSmallBox sx={{ mt: 1 }} component="form" onSubmit={handleSubmit(handleChangeEmail)}>
            <TextField
                label="Nowy email"
                {...customRefNameRegister(register, 'email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
            />
            <Button type="submit" disabled={!isValid}>
                Zmień
            </Button>
        </USSmallBox>
    );
};

export default UserSettingsEmail;
