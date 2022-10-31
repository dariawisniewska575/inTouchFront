import { createContext } from 'react';
import { UserContextUser, UserContext as UserContextModel } from 'src/common/models/contexts/UserContext';
import { getWindow } from 'src/common/helpers/windowHelper';
import { LocalStorageKey } from '../enums/LocalStorageKey';
import { getStorageObject } from '../helpers/storageHelper';
import { StorageTypes } from '../enums/StorageTypes';

export const getPersistedUserContextUser = (): UserContextUser | undefined => {
    if (getWindow()) {
        const user = getStorageObject<UserContextUser>(LocalStorageKey.UserContextKey, StorageTypes.Session);
        if (user) {
            user.isTokenBeingChecked = true;
            return user;
        }
        return undefined;
    }

    return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContext = createContext<UserContextModel>(null as any);
