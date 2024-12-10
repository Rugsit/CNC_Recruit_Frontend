import React, { useState } from 'react'
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import FileIcon from '@/public/form/file.svg';

export default function FileUpload({
  name,
  title,
  description,
  accept,
  error,
  icon
}: {
  name: string,
  title: string,
  description: string,
  accept: string,
  error: string,
  icon: {
    src: any,
    alt: string
  }
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 mb-6 border border-gray-200 rounded-lg">
      <p className="md:text-xl text-xl text-bold">{title}</p>
      <div className="flex flex-col gap-y-[15px] items-center py-10 bg-gray-100 border border-gray-300 rounded-lg">
        <Image
          src={icon.src}
          alt={icon.alt}
        />
        <p className="md:text-xl text-center text-base">
          {description}
        </p>
        <label>
          <input
            name={name}
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
            className="border bg-white border-black md:text-xl text-base text-black font-medium"
            as="span"
          >เลือกไฟล์
          </Button>
        </label>
      </div>
      {
        error &&
        <p className="text-red-500">{error}</p>
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
