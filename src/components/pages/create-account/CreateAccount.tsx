import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createAccountRequest } from 'src/api/auth/authApi';
import { toast } from 'react-toastify';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import { User } from 'src/common/models/dto/user/User';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { CenteringMarginContainer } from 'src/components/common/stateless/centering-container/CenteringContainer';
const CreateAccount: React.FC = () => {
    const { handleSubmit, register } = useForm<User>();

    const onSubmit = async (data: User) => {
        try {
            data.sex = 1;
            await createAccountRequest(data);
            toast.success('Konto zostało utworzone');
        } catch (ex) {
            handleApiError(ex);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CenteringMarginContainer>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <CreateOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zarejestruj się
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        {...customRefNameRegister(register, 'firstName')}
                        label="Imię"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        {...customRefNameRegister(register, 'lastName')}
                        label="Nazwisko"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        {...customRefNameRegister(register, 'email')}
                        label="Adres email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        {...customRefNameRegister(register, 'password')}
                        type="password"
                        label="Hasło"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        {...customRefNameRegister(register, 'age')}
                        type="number"
                        label="Wiek"
                        autoFocus
                    />

                    <Button
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Utwórz konto
                    </Button>
                </Box>
            </CenteringMarginContainer>
        </Container>
    );
};

export default CreateAccount;
