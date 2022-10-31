import { object, string } from 'yup';

export const signInValidationSchema = () =>
    object().shape({
        email: string().required('Pole jest wymagane').email('Niepoprawny email'),
        password: string().required('Pole jest wymagane'),
    });
