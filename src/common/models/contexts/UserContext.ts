import { User } from '../dto/user/User';

export interface UserContextUser {
    isTokenBeingChecked?: boolean;
    isLogged: boolean;
    accessTokenExpirationDate: Date;

    userId: string;

    userDetails?: User;
}

export interface UserContext {
    user?: UserContextUser;
    setUserContextUser: React.Dispatch<React.SetStateAction<UserContextUser | undefined>>;
}
