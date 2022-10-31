import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { ErrorCodes } from '../enums/ErrorCodes';
import { HttpCodes } from '../enums/HttpCodes';
import { LocalStorageKey } from '../enums/LocalStorageKey';
import { StorageTypes } from '../enums/StorageTypes';
import { getStorageString } from '../helpers/storageHelper';
import { ErrorResponse } from '../models/responses/ErrorResponse';

export const createApiClient = (baseUrl: string): AxiosInstance => {
    const apiClient = axios.create({
        baseURL: baseUrl,
        headers: {
            'X-XSRF-TOKEN': '',
        },
        withCredentials: true,
    });

    apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
        const accessToken = getStorageString(LocalStorageKey.UserAccessTokenKey, StorageTypes.Session);

        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        return config;
    });

    apiClient.interceptors.response.use(
        (response) => handleResponse(response),
        async (error: AxiosError) => {
            const errorResponseData: ErrorResponse = error?.response?.data as ErrorResponse;
            const errorResponse = error.response;
            const errorMessage = error.message;

            if (axios.isCancel(error)) {
                return Promise.reject({ code: ErrorCodes.AxiosTokenCancelled });
            } else if (!errorResponse) {
                return Promise.reject({ code: ErrorCodes.NetworkError, message: errorMessage });
            } else if (
                errorResponse.status === HttpCodes.Unauthorized &&
                errorResponseData.code === ErrorCodes.TokenExpired
            ) {
                return Promise.reject({ code: ErrorCodes.TokenExpired, message: errorMessage });
            } else if (
                errorResponse.status === HttpCodes.Unauthorized &&
                errorResponseData.code === ErrorCodes.RefreshTokenFailed
            ) {
                return Promise.reject({ code: ErrorCodes.RefreshTokenFailed });
            } else if (
                errorResponse.status === HttpCodes.Unauthorized ||
                errorResponse.status === HttpCodes.Forbidden
            ) {
                return Promise.reject({ code: ErrorCodes.Unauthorized });
            } else {
                return handleOtherErrors(error as AxiosError<ErrorResponse>);
            }
        },
    );

    return apiClient;
};

const handleResponse = (response: AxiosResponse) => {
    return response.status.toString()[0] === '2' ? Promise.resolve(response) : Promise.reject(response);
};

const handleOtherErrors = (error: AxiosError<ErrorResponse>) => {
    const message = error.response?.data?.message ? error.response.data.message : error.message;
    const code = error.response?.data?.code ? error.response.data.code : ErrorCodes.GeneralError;

    return Promise.reject({ code, message });
};
