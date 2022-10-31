export const isObject = (value: unknown): boolean => {
    return typeof value === 'object' && value !== null;
};

export const isString = (value: unknown): boolean => {
    return typeof value === 'string';
};
