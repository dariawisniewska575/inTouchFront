import { ClaimTypes } from 'src/common/enums/ClaimTypes';

export interface JWT {
    [ClaimTypes.NameIdentifier]: string;
    [ClaimTypes.Subject]: string;
    exp: number;
    jti: string;
    iat: string;
    iss: string;
    aud: string;
}
