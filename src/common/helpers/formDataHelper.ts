/* eslint-disable @typescript-eslint/ban-types */

type SimpleType = string | number | boolean;

const isSimpleType = (value: unknown) =>
    typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

const isFile = (value: unknown) => value instanceof Blob || value instanceof File;

const createFormDataArrayKey = (key: string, index: number, value: unknown, parentKey?: string): string => {
    if (parentKey) {
        return parentKey + '[' + key + ']' + '[' + index + ']';
    }
    return createFormDataKey(index.toString(), value, key);
};

const createFormDataKey = (key: string, value: unknown, parentKey?: string): string => {
    if (parentKey) {
        if (isFile(value)) {
            return parentKey + '.' + key;
        }
        return parentKey + '[' + key + ']';
    } else {
        return key;
    }
};

const getFormDataValue = (value: unknown): string | Blob => {
    if (isSimpleType(value)) {
        return (value as SimpleType).toString();
    }
    return value as Blob;
};

const transformObjectToFormData = (existingFormData: FormData | null, obj: {}, parentKey?: string) => {
    const formData = existingFormData ?? new FormData();

    if (obj !== null && obj !== undefined) {
        if ((isSimpleType(obj) || isFile(obj)) && parentKey) {
            formData.set(createFormDataKey(parentKey, obj), getFormDataValue(obj));
        } else {
            Object.entries(obj).map(([key, value]) => {
                if (isSimpleType(value) || isFile(value)) {
                    formData.set(createFormDataKey(key, value, parentKey), getFormDataValue(value));
                } else if (Array.isArray(value)) {
                    value.forEach((element, index) => {
                        transformObjectToFormData(
                            formData,
                            element as {},
                            createFormDataArrayKey(key, index, element, parentKey),
                        );
                    });
                } else {
                    transformObjectToFormData(formData, value as {}, createFormDataKey(key, value, parentKey));
                }
            });
        }
    }

    return formData;
};

export const objectToFormData = (obj: {}): FormData => {
    return transformObjectToFormData(null, obj);
};
