'use client';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

import { AngleRight } from './icons';

import image1 from '@/public/images/image_1.jpg';
import image2 from '@/public/images/image_2.jpg';
import image3 from '@/public/images/image_3.jpg';
import image4 from '@/public/images/image_4.jpg';
import image5 from '@/public/images/image_5.jpg';

export default function ShowImageLab() {
  const listOfImage: StaticImageData[] = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const next = () => {
    setCurrentImage(currentImage + 1);
  };

  const prev = () => {
    setCurrentImage(currentImage - 1);
  };

  return (
    <div className='mx-[20px] mt-[200px]'>
      <p className='text-center lg:text-4xl text-3xl text-white mb-5'>
        บรรยากาศภายใน Lab
      </p>
      <div className='transition-transform relative flex items-center rounded-lg overflow-hidden max-w-[1000px] mx-auto'>
        <Button
          isIconOnly
          className={clsx('bg-white absolute opacity-100 left-3 z-30', {
            'bg-gray-400': currentImage === 0,
          })}
          isDisabled={currentImage === 0}
          radius='full'
          onClick={prev}
        >
          <AngleRight
            className='w-4 rotate-180'
            fill={currentImage !== 0 ? '#42B5FC' : '#3B434F'}
          />
        </Button>

        <div className='w-full overflow-hidden'>
          <div
            className='whitespace-nowrap transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {listOfImage.map((item, index) => (
              <div
                key={index}
                className='inline-flex w-full max-w-[1000px] sm:h-[500px] h-[300px] object-center rounded-lg shrink-0'
              >
                <Image
                  alt='test'
                  className='w-full h-full rounded-lg object-cover object-center hover:scale-105 transition-all'
                  src={item}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ปุ่มถัดไป */}
        <Button
          isIconOnly
          className={clsx('bg-white absolute opacity-100 right-3 z-30', {
            'bg-gray-400': currentImage === listOfImage.length - 1,
          })}
          isDisabled={currentImage === listOfImage.length - 1}
          radius='full'
          onClick={next}
        >
          <AngleRight
            className='w-4'
            fill={
              currentImage !== listOfImage.length - 1 ? '#42B5FC' : '#3B434F'
            }
          />
        </Button>

        {/* จุดแสดงสถานะ */}
        <div className='flex absolute bottom-6 mx-auto w-full justify-center items-center gap-2'>
          {listOfImage.map((_, index) => (
            <div
              key={index}
              className={clsx(
                'bg-white w-2 h-2 rounded-full opacity-80 transition-all',
                {
                  'scale-150': index === currentImage,
                }
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
