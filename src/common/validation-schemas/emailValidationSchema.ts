import { object, string } from 'yup';

export const emailValidationSchema = () =>
    object().shape({
        email: string().required('Pole jest wymagane').email('Niepoprawny email'),
    });
