import React from 'react'
import { Textarea } from '@nextui-org/input'
import { UseFormRegisterReturn } from 'react-hook-form'

export default function TextareaForm({
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
        <div className="flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 border border-gray-200 rounded-lg">
            <p className="text-base font-bold">{title}</p>
            <Textarea
                {...register}
                variant="faded"
                placeholder={description}
                maxRows={3}
                classNames={{
                    inputWrapper: "bg-gray-100 border border-gray-300",
                    input: "placeholder:text-gray-400"
                }}
            />
            {
                errorMessage &&
                <p className="text-red-500 font-light">{errorMessage}</p>
            }
        </div>
    )
}
