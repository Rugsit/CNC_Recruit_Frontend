import React from 'react'
import { Textarea } from '@nextui-org/input'

export default function TextareaForm({
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
            <p className="md:text-xl text-base text-bold">{title}</p>
            {
                description &&
                (<p className="text-gray-500 text-base font-light">{description}</p>)
            }
            <Textarea
                name={name}
                variant="faded"
                placeholder="Value"
                maxRows={3}
                classNames={{
                    inputWrapper: "bg-gray-100 border border-gray-300",
                    input: "placeholder:text-gray-400"
                }}
            />
            {
                error &&
                <p className="text-red-500">{error}</p>
            }
        </div>
    )
}
