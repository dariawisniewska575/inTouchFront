/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref } from 'react';
import { ChangeHandler, FieldPath, FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';

export const customRefNameRegister = <T extends FieldValues>(
    register: UseFormRegister<T>,
    name: FieldPath<T>,
): {
    inputRef: Ref<any>;
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
} => {
    const { ref, ...rest } = register(name);
    return { ...rest, inputRef: ref };
};
