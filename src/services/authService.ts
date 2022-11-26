import { signInRequest } from 'src/api/authApi';
import { ClaimTypes } from 'src/common/enums/ClaimTypes';
import { LocalStorageKey } from 'src/common/enums/LocalStorageKey';
import { StorageTypes } from 'src/common/enums/StorageTypes';
import { decodeJWT } from 'src/common/helpers/jwtHelper';
import { setStorageObject, setStorageString } from 'src/common/helpers/storageHelper';
import { SignInRequest } from 'src/common/models/api/auth/requests/SignInRequest';
import { SignInResponse } from 'src/common/models/api/auth/responses/SignInResponse';
import { UserContextUser } from 'src/common/models/contexts/UserContext';

export const signIn = async (
    request: SignInRequest,
    setUserContext: React.Dispatch<React.SetStateAction<UserContextUser | undefined>>,
): Promise<SignInResponse> => {
    const response = await signInRequest(request);
    setTokensInUserContext(response, setUserContext);
    return response;
};

export const setTokensInUserContext = (
    response: SignInResponse,
    setUserContext: React.Dispatch<React.SetStateAction<UserContextUser | undefined>>,
): void => {
    const jwt = decodeJWT(response.token);

    const userContextValue: UserContextUser = {
        isLogged: true,
        userId: jwt[ClaimTypes.Subject],
        accessTokenExpirationDate: new Date(jwt[ClaimTypes.Iat]),
    };

    setStorageObject(LocalStorageKey.UserContextKey, userContextValue, StorageTypes.Session);
    setStorageString(LocalStorageKey.UserAccessTokenKey, response.token, StorageTypes.Session);
    setStorageString(LocalStorageKey.UserRefreshTokenKey, response.refreshToken, StorageTypes.Session);

    userContextValue.isTokenBeingChecked = false;
    setUserContext((userContext) => ({ ...userContext, ...userContextValue }));
};
