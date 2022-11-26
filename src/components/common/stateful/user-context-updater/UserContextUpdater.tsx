import React, { useContext, useEffect } from 'react';
import { getCurrentUserRequest } from 'src/api/currentUserApi';
import { UserContext } from 'src/common/context/UserContext';
import { handleApiError } from 'src/common/helpers/errorHelper';

const UserContextUpdater: React.FC = () => {
    const userContext = useContext(UserContext);
    const isLogged = userContext.user?.isLogged;
    const userId = userContext.user?.userId;
    const isTokenBeingChecked = userContext?.user?.isTokenBeingChecked;
    const setUserContextUser = userContext?.setUserContextUser;
    const isReadyToGetData = !isTokenBeingChecked && isLogged;

    useEffect(() => {
        if (isReadyToGetData) {
            (async () => {
                try {
                    const response = await getCurrentUserRequest();

                    setUserContextUser?.((userContextUser) => {
                        if (!userContextUser) {
                            return userContextUser;
                        }
                        return {
                            ...userContextUser,
                            userDetails: response,
                        };
                    });
                } catch (error) {
                    handleApiError(error);
                }
            })();
        }
    }, [setUserContextUser, isReadyToGetData, userId]);

    return null;
};

export default UserContextUpdater;
