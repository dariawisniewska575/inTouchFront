import React, { useContext, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { SignInRequest } from 'src/common/models/api/auth/requests/SignInRequest';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import { signIn } from 'src/services/authService';
import router from 'next/router';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import { Pages } from 'src/common/enums/Pages';
import CustomLink from '../../common/statefull/custom-link/CustomLink';
import { signInValidationSchema } from 'src/common/validation-schemas/signInValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { UserContext } from 'src/common/context/UserContext';
import { CenteringMarginContainer } from '../../common/stateless/centering-container/CenteringContainer';

const SignIn: React.FC = () => {
    const { setUserContextUser } = useContext(UserContext);

    const validationSchema = useMemo(() => signInValidationSchema(), []);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInRequest>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: SignInRequest) => {
        try {
            await signIn(data, setUserContextUser);
            // const currentUserResponse = await getCurrentUserRequest();

            // setUserContextUser((userContextUser) => {
            //     if (!userContextUser) {
            //         return userContextUser;
            //     }
            //     return {
            //         ...userContextUser,
            //         userDetails: currentUserResponse,
            //     };
            // });

            await router.push(getPageUrl(Pages.dashboard));
        } catch (ex) {
            handleApiError(ex);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CenteringMarginContainer>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zaloguj się
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        {...customRefNameRegister(register, 'email')}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adres email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...customRefNameRegister(register, 'password')}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color={isValid ? 'success' : 'info'}
                    >
                        Zaloguj się
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <CustomLink page={Pages.resetPassword}>Przypomnij hasło</CustomLink>
                        </Grid>
                    </Grid>
                </Box>
            </CenteringMarginContainer>
        </Container>
    );
};

export default SignIn;
