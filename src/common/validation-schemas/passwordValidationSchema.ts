import { object, string } from 'yup';

export const passwordValidationSchema = () =>
    object().shape({
        newPassword: string().required('Pole jest wymagane'),
    });
