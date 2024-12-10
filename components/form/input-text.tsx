import React from 'react';
import { Input } from '@nextui-org/input';

export default function InputText({
    name,
    title,
    description,
    error
}: {
    name: string,
    title: string,
    description?: string,
    error: string
}) {
    return (
        <div className="flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 mb-6 border border-gray-200 rounded-lg">
            <p className="text-base text-bold">{title}</p>
            {
                description &&
                (<p className="text-gray-500 text-base font-light">{description}</p>)
            }
            <Input
                name={name}
                variant="faded"
                placeholder="Value"
                classNames={{
                    inputWrapper: "placeholder-gray-300 bg-gray-100 border-1 border-gray-300",
                    input: "placeholder:text-gray-400"
                }}
            />
            {
                error &&
                <p className="text-red-500">{error}</p>
            }
        </div>
    );
}
