import { Avatar, Box, Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAccountRequest } from 'src/api/auth/authApi';
import { toast } from 'react-toastify';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { customRefNameRegister } from 'src/common/helpers/reactHookFormHelper';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { CenteringMarginContainer } from 'src/components/common/stateless/centering-container/CenteringContainer';
import { Gender } from 'src/common/enums/Gender';
import CustomLink from 'src/components/common/stateful/custom-link/CustomLink';
import inTouchColors from 'src/common/styles/variables/themes/inTouchColors';
import { Pages } from 'src/common/enums/Pages';
import { GenderTranslation } from 'src/common/enums/translations/GenderTranslations';
import { CreateAccountRequest } from 'src/common/models/api/auth/requests/CreateAccountRequest';
import { getPasswordRequirements } from 'src/common/helpers/passwordHelper';
import HintChip, { HintChipContainer } from 'src/components/common/stateful/hint-chip/HintChip';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountValidationSchema } from 'src/common/validation-schemas/createAccountValidationSchema';

const CreateAccount: React.FC = () => {
    const validationSchema = useMemo(() => createAccountValidationSchema(), []);

    const {
        handleSubmit,
        register,
        watch,
        formState: { isValid, isSubmitted, errors },
    } = useForm<CreateAccountRequest>({ resolver: yupResolver(validationSchema), mode: 'onTouched' });
    const [gender, setGender] = useState<Gender>(Gender.MALE);
    const [validPasswordRequirements, setValidPasswordRequirements] = useState<boolean>(false);

    const genders = Object.values(Gender).filter((value) => typeof value === 'number') as Gender[];
    const genderTranslations = Object.values(GenderTranslation) as GenderTranslation[];

    const handleChangeGender = (gender: Gender) => {
        setGender(gender);
    };

    const watchPassword = watch('password', '');

    const passwordRequirements = useMemo(() => {
        const requirements = getPasswordRequirements(watchPassword);
        !Boolean(Object.entries(requirements).find(([, value]) => !value))
            ? setValidPasswordRequirements(true)
            : setValidPasswordRequirements(false);
        return requirements;
    }, [watchPassword]);

    const onSubmit = async (data: CreateAccountRequest) => {
        try {
            await createAccountRequest(data);
            toast.success('Konto zostało utworzone');
        } catch (ex) {
            handleApiError(ex);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', margin: '20px' }}>
                <div style={{ flexDirection: 'column' }}>
                    <div>Masz już konto?</div>
                    <div style={{ color: inTouchColors.lightBlue, fontWeight: '600' }}>
                        <CustomLink page={Pages.signIn}>Zaloguj się</CustomLink>
                    </div>
                </div>
            </div>
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
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            {...customRefNameRegister(register, 'lastName')}
                            label="Nazwisko"
                            autoFocus
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            {...customRefNameRegister(register, 'email')}
                            label="Adres email"
                            autoFocus
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            {...customRefNameRegister(register, 'password')}
                            type="password"
                            label="Hasło"
                            autoFocus
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
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
                        <TextField
                            margin="normal"
                            fullWidth
                            {...customRefNameRegister(register, 'age')}
                            type="number"
                            label="Wiek"
                            autoFocus
                            error={Boolean(errors.age)}
                            helperText={errors.age?.message}
                        />

                        <Box>
                            <InputLabel id="genderLabel">Płeć</InputLabel>
                            <Select
                                labelId="genderLabel"
                                variant="outlined"
                                fullWidth
                                value={gender}
                                {...customRefNameRegister(register, 'sex')}
                            >
                                {genders.map((gender, i) => (
                                    <MenuItem key={gender} value={gender} onClick={() => handleChangeGender(gender)}>
                                        <Typography> {genderTranslations.at(i)}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Button
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!(isValid && validPasswordRequirements)}
                        >
                            Utwórz konto
                        </Button>
                    </Box>
                </CenteringMarginContainer>
            </Container>
        </>
    );
};

export default CreateAccount;
