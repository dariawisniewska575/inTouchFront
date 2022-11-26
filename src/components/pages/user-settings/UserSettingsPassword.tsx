import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordRequest } from 'src/api/accountApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { getPasswordRequirements } from 'src/common/helpers/passwordHelper';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import { changePasswordValidationSchema } from 'src/common/validation-schemas/changePasswordValiddationSchema';
import HintChip, { HintChipContainer } from 'src/components/common/stateful/hint-chip/HintChip';
import { USSmallBox } from './UserSettingStyles';

interface Password {
    oldPassword: string;
    newPassword: string;
}

const UserSettingsPassword = (): JSX.Element => {
    const passwordValidation = useMemo(() => changePasswordValidationSchema(), []);
    const [validPasswordRequirements, setValidPasswordRequirements] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        watch,
        formState: { isValid, isSubmitted, errors },
    } = useForm<Password>({ resolver: yupResolver(passwordValidation), mode: 'onTouched' });

    const handleChangePassword = useCallback(async (data: Password) => {
        try {
            await changePasswordRequest({ newPassword: data.newPassword, oldPassword: data.oldPassword });
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    const watchPassword = watch('newPassword', '');
    const watchOldPassword = watch('oldPassword', '');
    const passwordRequirements = useMemo(() => {
        const requirements = getPasswordRequirements(watchPassword);
        !Boolean(Object.entries(requirements).find(([, value]) => !value))
            ? setValidPasswordRequirements(true)
            : setValidPasswordRequirements(false);
        return requirements;
    }, [watchPassword]);

    return (
        <USSmallBox sx={{ mt: 1 }} component="form" onSubmit={handleSubmit(handleChangePassword)}>
            <TextField
                label="Stare hasło"
                type={'password'}
                {...customRefNameRegister(register, 'oldPassword')}
                error={Boolean(errors.oldPassword)}
                helperText={errors.oldPassword?.message}
            />
            <TextField
                label="Nowe hasło"
                type={'password'}
                {...customRefNameRegister(register, 'newPassword')}
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword?.message}
            />
            <HintChipContainer>
                {watchPassword.length > 0 &&
                    Object.entries(passwordRequirements).map(([key, value]) => (
                        <HintChip success={value ? true : isSubmitted ? false : undefined} icon key={key} label={key} />
                    ))}
            </HintChipContainer>
            {watchOldPassword !== watchPassword && <Typography>Hasła się róznią</Typography>}
            <Button type="submit" disabled={!(isValid && validPasswordRequirements)}>
                Zmień
            </Button>
        </USSmallBox>
    );
};

export default UserSettingsPassword;
