import { object, string } from 'yup';

export const changePasswordValidationSchema = () =>
    object().shape({
        oldPassword: string().required('Pole jest wymagane'),
        newPassword: string().required('Pole jest wymagane'),
    });
