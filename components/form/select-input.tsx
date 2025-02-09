interface SelectInputProps {
    title: string,
    options: { value: string; label: string }[],
    register: any,
}

export default function SelectInput({ title, options, register }: SelectInputProps) {
    return (
        <div className="flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 border border-gray-200 rounded-lg">
            <label className="text-base text-[#3B434F] font-bold">{title}</label>
            <select
                {...register}
                className="font-normal appearance-none bg-gray-100 border-1 border-gray-300 rounded-xl px-3 py-2 w-full focus-within:border-blue-500 focus-within:border-2"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
