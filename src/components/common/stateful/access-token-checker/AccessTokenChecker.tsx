import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { refreshUserTokenRequest } from 'src/api/auth/currentUserApi';
import { UserContext } from 'src/common/context/UserContext';
import { ClaimTypes } from 'src/common/enums/ClaimTypes';
import { LocalStorageKey } from 'src/common/enums/LocalStorageKey';
import { Pages } from 'src/common/enums/Pages';
import { StorageTypes } from 'src/common/enums/StorageTypes';
import { decodeJWT } from 'src/common/helpers/jwtHelper';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import { getStorageString, setStorageObject, setStorageString } from 'src/common/helpers/storageHelper';
import { UserContextUser } from 'src/common/models/contexts/UserContext';

const AccessTokenChecker: React.FC = () => {
    const userContext = useContext(UserContext);
    const isLogged = userContext?.user?.isLogged;
    const { setUserContextUser } = useContext(UserContext);
    const router = useRouter();
    const accessTokenExpirationDate = userContext?.user?.accessTokenExpirationDate;

    const checkIntervalMinutes: number = useMemo(() => {
        return process.env.NEXT_PUBLIC_ACCESS_TOKEN_CHECK_DATE_INTERVAL_MINUTES as unknown as number;
    }, []);
    const refreshToken = useCallback(async () => {
        try {
            const token = getStorageString(LocalStorageKey.UserAccessTokenKey, StorageTypes.Session);
            const refreshToken = getStorageString(LocalStorageKey.UserRefreshTokenKey, StorageTypes.Session);
            const response = await refreshUserTokenRequest({
                token: token as string,
                refreshToken: refreshToken as string,
            });

            if (userContext?.user) {
                const jwt = decodeJWT(response.token);

                const newValues: UserContextUser = {
                    ...userContext.user,
                    accessTokenExpirationDate: new Date(jwt['iat']),
                    isTokenBeingChecked: false,
                };

                setUserContextUser(newValues);
                setStorageObject(LocalStorageKey.UserContextKey, newValues, StorageTypes.Session);
                setStorageString(LocalStorageKey.UserAccessTokenKey, response.token, StorageTypes.Session);
            }
        } catch (error) {
            toast.error('Sesja wygasła, zaloguj się ponownie', {
                onClick: () => router.push(getPageUrl(Pages.signIn)),
            });
            setUserContextUser(undefined);
            setStorageObject(LocalStorageKey.UserContextKey, null, StorageTypes.Session);
        }
    }, [router, setUserContextUser, userContext.user]);
    const [isInitiallyChecked, setIsInitiallyChecked] = useState(false);

    const doesTokenNeedRefresh = useCallback(() => {
        if (!accessTokenExpirationDate) {
            return false;
        }

        return (accessTokenExpirationDate.getTime() - Date.now()) / 1000 < checkIntervalMinutes * 60;
    }, [accessTokenExpirationDate, checkIntervalMinutes]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        (async () => {
            if (!isInitiallyChecked && setUserContextUser) {
                if (doesTokenNeedRefresh()) {
                    await refreshToken();
                } else {
                    setUserContextUser((userContextUser) =>
                        userContextUser
                            ? {
                                  ...userContextUser,
                                  isTokenBeingChecked: false,
                              }
                            : undefined,
                    );
                }
                setIsInitiallyChecked(true);
            } else if (isLogged) {
                intervalId = setInterval(async () => {
                    if (doesTokenNeedRefresh()) {
                        await refreshToken();
                    }
                }, checkIntervalMinutes * 60 * 1000);
            }
        })();
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [checkIntervalMinutes, doesTokenNeedRefresh, isInitiallyChecked, isLogged, refreshToken, setUserContextUser]);
    return null;
};

export default AccessTokenChecker;
