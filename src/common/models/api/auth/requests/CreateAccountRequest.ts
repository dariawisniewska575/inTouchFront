import { Gender } from 'src/common/enums/Gender';

export interface CreateAccountRequest {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    sex: Gender;
    age: number;
}
