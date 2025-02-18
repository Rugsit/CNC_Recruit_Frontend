import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import { FileImage } from '../icons';

interface FileUploadProps {
  title: string;
  desc: string;
  accept: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  icon: {
    src: any;
    alt: string;
  };
  existedFile: {
    name: string;
    url: string;
  };
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  setFile?: (file: File) => void;
  isExpired: boolean;
}

export default function FileUpload({
  title,
  desc,
  accept,
  register,
  errorMessage,
  icon,
  setValue,
  trigger,
  existedFile,
  setFile,
  isExpired,
}: FileUploadProps) {
  const [displayFileName, setDisplayFileName] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');

  useEffect(() => {
    setDisplayFileName(existedFile.name);
    setFileUrl(existedFile.url);
    setValue(register.name, existedFile.url);
    // console.log(displayFileName);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setDisplayFileName(file.name);
      const objectUrl = URL.createObjectURL(file);

      setFileUrl(objectUrl);
      setValue(register.name, file);
      trigger(register.name);

      if (setFile) {
        setFile(file);
      }
    }
  };

  const handlePreview = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className='flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 border border-gray-200 rounded-lg'>
      <p className='text-base font-bold text-[#3B434F]'>{title}</p>
      <div className='flex flex-col gap-y-[15px] items-center py-10 bg-gray-100 border border-gray-300 rounded-lg'>
        <Image
          alt={icon.alt}
          src={icon.src}
        />
        <p className='md:text-base text-sm px-2 text-center'>{desc}</p>
        <label id={register.name}>
          <input
            {...register}
            accept={accept}
            className='hidden'
            disabled={isExpired}
            type='file'
            onChange={handleFileChange}
          />
          <Button
            as='span'
            className={`${isExpired ? 'hidden' : 'flex'} border bg-white border-[#3B434F] md:text-base text-sm text-[#3B434F] font-medium`}
            variant='bordered'
          >
            เลือกไฟล์
          </Button>
        </label>
      </div>
      {errorMessage && (
        <p className='text-red-500 font-light'>{errorMessage}</p>
      )}
      {displayFileName && (
        <button
          className='flex flex-row gap-x-5 py-3 px-4 items-center bg-[#3B434F] border border-gray-200 rounded-lg overflow-y-hidden transition-all hover:scale-95'
          style={{ cursor: 'pointer' }}
          onClick={handlePreview}
        >
          <FileImage
            fill='#ffffff'
            height={28}
            width={28}
          />
          <p className='text-base text-white cursor-pointer'>
            {displayFileName}
          </p>
        </button>
      )}
    </section>
  );
}
