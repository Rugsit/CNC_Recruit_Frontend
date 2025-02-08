import { useState } from 'react';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { UseFormRegisterReturn, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import FileIcon from '@/public/form/file.svg';

interface FileUploadProps {
  title: string,
  description: string,
  accept: string,
  register: UseFormRegisterReturn,
  errorMessage: string | undefined,
  icon: {
    src: any,
    alt: string
  },
  setValue: UseFormSetValue<any>,
  trigger: UseFormTrigger<any>,
};

export default function FileUpload({ title, description, accept, register, errorMessage, icon, setValue, trigger }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Handle upload file to validate the file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
      setValue(register.name, file);
      trigger(register.name);
    }
  };

  // Handle upload file to preview the file in another tab
  const handlePreview = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <section className="flex flex-col gap-y-[8px] md:px-10 md:py-5 px-5 py-4 border border-gray-200 rounded-lg">
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
            onChange={handleFileChange}
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
        (<div onClick={handlePreview} style={{ cursor: 'pointer' }} className="flex flex-row gap-x-5 py-3 px-4 items-center border border-gray-200 rounded-lg">
          <Image
            src={FileIcon}
            alt="file icon"
          />
          <p className="text-base text-black" onClick={handlePreview} style={{ cursor: 'pointer' }}>{selectedFile.name}</p>
        </div>)
      }
    </section>
  );
}