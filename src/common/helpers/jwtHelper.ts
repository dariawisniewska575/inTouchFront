import { JWT } from '../models/common/JWT';
import { getWindow } from './windowHelper';

export const decodeJWT = (token: string): JWT => {
    if (!getWindow()) {
        throw new Error('decodeJWT is only available on client');
    }

    const [, payload] = token.split('.');

    let output = payload.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }

    const result = window.atob(output);
    try {
        return JSON.parse(decodeURIComponent(escape(result)));
    } catch (err) {
        return JSON.parse(result);
    }
};
