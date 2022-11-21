import { useCallback, useContext } from 'react';
import { signOutRequest } from 'src/api/auth/currentUserApi';
import { UserContext } from 'src/common/context/UserContext';
import { LocalStorageKey } from 'src/common/enums/LocalStorageKey';
import { Pages } from 'src/common/enums/Pages';
import { StorageTypes } from 'src/common/enums/StorageTypes';
import { setStorageObject } from 'src/common/helpers/storageHelper';
import useRouterHelper from '../use-router-helper/useRouterHelper';

const useCurrentUserHelper = () => {
    const router = useRouterHelper();
    const userContext = useContext(UserContext);

    const signOut = useCallback(async () => {
        if (!userContext?.user?.isLogged) {
            setStorageObject(LocalStorageKey.UserContextKey, null, StorageTypes.Session);
            await router.push(Pages.signIn);
        } else {
            try {
                await signOutRequest();
                userContext?.setUserContextUser(undefined);
                setStorageObject(LocalStorageKey.UserContextKey, null, StorageTypes.Session);
            } catch {}
            await router.push(Pages.signIn);
        }
    }, [router, userContext]);

    return { signOut, currentUser: userContext.user };
};

export default useCurrentUserHelper;
