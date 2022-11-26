import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pages } from 'src/common/enums/Pages';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import CustomLink from 'src/components/common/stateful/custom-link/CustomLink';
import { CenteringMarginContainer } from 'src/components/common/stateless/centering-container/CenteringContainer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { sendPasswordResetLinkRequest } from 'src/api/authApi';
import { SendPasswordResetLinkRequest } from 'src/common/models/api/auth/requests/SendPasswordResetLinkRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailValidationSchema } from 'src/common/validation-schemas/emailValidationSchema';

const SendResetPassword: React.FC = () => {
    const validationSchema = useMemo(() => emailValidationSchema(), []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SendPasswordResetLinkRequest>({
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
    });
    const [isEmailSent, setIsEmailSent] = useState(false);

    const onSubmit = async (data: SendPasswordResetLinkRequest) => {
        try {
            await sendPasswordResetLinkRequest(data);
            setIsEmailSent(true);
        } catch (ex) {
            handleApiError(ex);
        }
    };

    return (
        <Container component="main">
            {!isEmailSent ? (
                <CenteringMarginContainer>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Resetowanie hasła
                    </Typography>
                    <Typography variant="subtitle1">Wpisz email</Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <TextField
                            {...customRefNameRegister(register, 'email')}
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Wyślij link do resetowania hasła
                        </Button>
                    </Box>
                </CenteringMarginContainer>
            ) : (
                <CenteringMarginContainer>
                    <Typography variant="h4">Kliknij w link wysłany na Twojego emaila!</Typography>
                    <CustomLink page={Pages.signIn}>Kliknij tutaj, aby przejść do strony logowania </CustomLink>
                </CenteringMarginContainer>
            )}
        </Container>
    );
};

export default SendResetPassword;
