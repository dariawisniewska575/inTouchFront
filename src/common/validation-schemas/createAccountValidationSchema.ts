import { number, object, string } from 'yup';

export const createAccountValidationSchema = () =>
    object().shape({
        email: string().required('Pole jest wymagane').email('Niepoprawny email'),
        password: string().required('Pole jest wymagane'),
        firstName: string().required('Pole jest wymagane'),
        lastName: string().required('Pole jest wymagane'),
        age: number().required('Pole jest wymagane').typeError('Pole jest wymagane'),
    });
