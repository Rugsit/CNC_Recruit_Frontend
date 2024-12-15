import React from 'react';
import { Input } from '@nextui-org/input';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function InputText({
    title,
    description,
    register,
    errorMessage,
}: {
    title: string,
    description?: string,
    register: UseFormRegisterReturn,
    errorMessage: string | undefined,
}) {
    return (
        <div className="flex flex-col gap-y-[8px] md:px-10 px-5 md:py-5 py-4 mb-6 border border-gray-200 rounded-lg">
            <p className="text-base font-bold">{title}</p>
            <Input
                {...register}
                variant="faded"
                placeholder={description}
                classNames={{
                    inputWrapper: "placeholder-gray-300 bg-gray-100 border-1 border-gray-300",
                    input: "placeholder:text-gray-400"
                }}
            />
            {
                errorMessage &&
                <p className="text-red-500 font-light">{errorMessage}</p>
            }
        </div>
    );
}
