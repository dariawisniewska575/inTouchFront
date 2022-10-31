import { createApiClient } from '../../common/configs/axiosClientConfig';

if (!process.env.NEXT_PUBLIC_AUTH_API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_AUTH_API_BASE_URL not set');
}

export const authApiClient = createApiClient(process.env.NEXT_PUBLIC_AUTH_API_BASE_URL);
