/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorageTypes } from '../enums/StorageTypes';
import { isObject } from './typeHelper';

export const setStorageItem = (key: string, value: unknown, type: StorageTypes): void => {
    if (key) {
        if (isObject(value)) {
            setStorageObject(key, value, type);
        } else {
            setStorageString(key, value as string, type);
        }
    }
};

export const setStorageObject = (key: string, value: any | null, type: StorageTypes): void => {
    if (key) {
        if (value) {
            type === StorageTypes.Local
                ? localStorage.setItem(key, JSON.stringify(value))
                : sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            type === StorageTypes.Local ? localStorage.setItem(key, '') : sessionStorage.setItem(key, '');
        }
    }
};

export const setStorageString = (key: string, value: string, type: StorageTypes): void => {
    if (key) {
        type === StorageTypes.Local
            ? localStorage.setItem(key, value ? value : '')
            : sessionStorage.setItem(key, value ? value : '');
    }
};

export const getStorageItem = <T>(key: string, type: StorageTypes): T | string | null => {
    if (key) {
        let stringValue: string | null;
        type === StorageTypes.Local
            ? (stringValue = localStorage.getItem(key))
            : (stringValue = sessionStorage.getItem(key));

        if (stringValue) {
            try {
                return JSON.parse(stringValue);
            } catch (err) {
                return stringValue ? stringValue : null;
            }
        }
    }

    return null;
};

export const getStorageObject = <T>(key: string, type: StorageTypes): T | null => {
    if (key) {
        let stringValue: string | null;
        type === StorageTypes.Local
            ? (stringValue = localStorage.getItem(key))
            : (stringValue = sessionStorage.getItem(key));

        if (stringValue) {
            try {
                return JSON.parse(stringValue);
            } catch (err) {}
        }
    }
    return null;
};

export const getStorageString = (key: string, type: StorageTypes): string | null => {
    if (key) {
        let stringValue: string | null;
        type === StorageTypes.Local
            ? (stringValue = localStorage.getItem(key))
            : (stringValue = sessionStorage.getItem(key));

        return stringValue;
    }
    return '';
};
