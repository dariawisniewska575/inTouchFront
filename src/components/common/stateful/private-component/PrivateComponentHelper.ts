import { UserContext } from 'src/common/models/contexts/UserContext';

export const isAuthorized = (userContext: UserContext | null): boolean => {
    if (userContext?.user?.isLogged) {
        return true;
    }

    return false;
};
