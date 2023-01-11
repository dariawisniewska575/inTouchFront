import { Gender } from 'src/common/enums/Gender';

export interface User {
    id: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
    isLogged: boolean;
    lastLogInDate: Date;
    avatarSource: string;
}
