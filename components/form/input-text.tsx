import { Input } from '@nextui-org/input';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps {
  title: string;
  desc?: string;
  register: UseFormRegisterReturn;
  errorMessage: string | undefined;
  isExpired: boolean;
}

export default function InputText({
  title,
  desc,
  register,
  errorMessage,
  isExpired,
}: InputTextProps) {
  return (
    <div className='flex flex-col gap-y-[8px] md:px-10 px-5 py-4 border border-gray-200 rounded-lg'>
      <label className='text-base text-[#3B434F] font-bold'>{title}</label>
      <Input
        {...register}
        classNames={{
          inputWrapper:
            'placeholder-gray-300 bg-gray-100 border-1 border-gray-300 focus-within:border-blue-500 focus-within:border-2',
          input: 'placeholder:text-gray-400',
        }}
        id={register.name}
        isDisabled={isExpired}
        placeholder={desc}
        variant='faded'
      />
      {errorMessage && (
        <p className='text-red-500 font-light'>{errorMessage}</p>
      )}
    </div>
  );
}
