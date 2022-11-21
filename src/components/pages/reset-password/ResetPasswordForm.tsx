import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ErrorCodes } from 'src/common/enums/ErrorCodes';
import { Pages } from 'src/common/enums/Pages';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { getPasswordRequirements } from 'src/common/helpers/passwordHelper';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import { getPageUrl, getQueryParams } from 'src/common/helpers/routingHelper';
import { ErrorResponse } from 'src/common/models/common/responses/ErrorResponse';
import { passwordValidationSchema } from 'src/common/validation-schemas/passwordValidationSchema';
import HintChip, { HintChipContainer } from 'src/components/common/stateful/hint-chip/HintChip';
import { CenteringMarginContainer } from 'src/components/common/stateless/centering-container/CenteringContainer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { resetPasswordRequest } from 'src/api/auth/authApi';
import { ResetPasswordRequest } from 'src/common/models/api/auth/requests/ResetPasswordRequest';

const ResetPasswordForm: React.FC = () => {
    const [validPasswordRequirements, setValidPasswordRequirements] = useState<boolean>(false);
    const router = useRouter();
    const validationSchema = useMemo(() => passwordValidationSchema(), []);
    const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitted, isValid },
    } = useForm<ResetPasswordRequest>({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const watchPassword = watch('password', '');

    const passwordRequirements = useMemo(() => {
        const requirements = getPasswordRequirements(watchPassword);
        !Boolean(Object.entries(requirements).find(([, value]) => !value))
            ? setValidPasswordRequirements(true)
            : setValidPasswordRequirements(false);
        return requirements;
    }, [watchPassword]);

    const { resetPasswordToken, email } = getQueryParams();

    const onSubmit = async (data: ResetPasswordRequest) => {
        try {
            await resetPasswordRequest({
                ...data,
                email: email as string,
                resetPasswordToken: resetPasswordToken as string,
            });

            toast.success('Hasło zostało zmienione');
            await router.push(getPageUrl(Pages.signIn));
        } catch (ex) {
            const errCode = (ex as ErrorResponse).code;
            errCode === ErrorCodes.TokenExpired ? setIsTokenValid(false) : handleApiError(ex);
        }
    };

    const sendEmailAgain = async () => {
        try {
            // await sendResetUserPasswordEmailRequest({ email: email as string });
            toast.success('Email został wysłany');
            await router.push(getPageUrl(Pages.signIn));
        } catch (ex) {
            handleApiError(ex);
        }
    };
    const tokenNotValidForm = (
        <CenteringMarginContainer>
            <Typography variant="h4">Wystąpił błąd, kliknij przycisk poniżej, aby ponownie wysłać emaila</Typography>
            <Button type="submit" variant="contained" onClick={() => sendEmailAgain()}>
                Wyślij email
            </Button>
        </CenteringMarginContainer>
    );

    const tokenValidForm = (
        <CenteringMarginContainer>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Wpisz hasło
            </Typography>

            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type="password"
                    {...customRefNameRegister(register, 'password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    fullWidth
                />

                <HintChipContainer>
                    {watchPassword.length > 0 &&
                        Object.entries(passwordRequirements).map(([key, value]) => (
                            <HintChip
                                success={value ? true : isSubmitted ? false : undefined}
                                icon
                                key={key}
                                label={key}
                            />
                        ))}
                </HintChipContainer>

                <Button type="submit" fullWidth variant="contained" disabled={!(isValid && validPasswordRequirements)}>
                    Zmień hasło
                </Button>
            </Box>
        </CenteringMarginContainer>
    );
    return isTokenValid ? tokenValidForm : tokenNotValidForm;
};

export default ResetPasswordForm;
