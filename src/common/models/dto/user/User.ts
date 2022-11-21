import { Gender } from 'src/common/enums/Gender';

export interface User {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
}
