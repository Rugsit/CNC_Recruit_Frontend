import React, { useState } from 'react'
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';
import FileIcon from '@/public/form/file.svg';

export default function FileUpload({
  title,
  description,
  accept,
  register,
  errorMessage,
  icon
}: {
  title: string,
  description: string,
  accept: string,
  register: UseFormRegisterReturn,
  errorMessage: string | undefined,
  icon: {
    src: any,
    alt: string
  }
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 mb-6 border border-gray-200 rounded-lg">
      <p className="text-base font-bold">{title}</p>
      <div className="flex flex-col gap-y-[15px] items-center py-10 bg-gray-100 border border-gray-300 rounded-lg">
        <Image
          src={icon.src}
          alt={icon.alt}
        />
        <p className="md:text-base text-sm px-2 text-center">
          {description}
        </p>
        <label>
          <input
            {...register}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
              }
            }}
          />
          <Button
            variant="bordered"
            className="border bg-white border-black md:text-base text-sm text-black font-medium"
            as="span"
          >เลือกไฟล์
          </Button>
        </label>
      </div>
      {
        errorMessage &&
        <p className="text-red-500 font-light">{errorMessage}</p>
      }
      {
        selectedFile &&
        (<div className="flex flex-row gap-x-5 py-3 px-4 items-center border border-gray-200 rounded-lg">
          <Image
            src={FileIcon}
            alt="file icon"
          />
          <p className="text-base text-black">{selectedFile.name}</p>
        </div>
        )}
    </div>
  )
}
