import { object, string } from 'yup';

export const passwordValidationSchema = () =>
    object().shape({
        password: string().required('Pole jest wymagane'),
    });
