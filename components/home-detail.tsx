'use client'
import Image, { StaticImageData } from "next/image";
import image1 from "@/public/images/image_1.jpg"
import image2 from "@/public/images/image_2.jpg"
import image3 from "@/public/images/image_3.jpg"
import image4 from "@/public/images/image_4.jpg"
import image5 from "@/public/images/image_5.jpg"
import { AngleRight } from "./icons";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function HomeDetails() {
  const listOfImage:StaticImageData[] = [image1, image2, image3, image4, image5];
  const [currentImage, setCurrentImage] = useState(0);


  const next = () => {
    setCurrentImage(currentImage + 1);
  }

  const prev = () => {
    setCurrentImage(currentImage - 1);
  }
  return (
    <article className="grid grid-rows-[auto_auto] grid-cols-[minmax(auto,800px)] xl:grid-cols-[minmax(auto,_800px)_minmax(auto,_500px)] gap-10 w-full  mx-auto max-w-fit pt-[200px] px-[20px]" id="about-lab">
      <div className="relative flex items-center  rounded-lg overflow-hidden" >
        <Button className={clsx("bg-white absolute opacity-100 left-3 z-30", {
          " bg-gray-400" : currentImage == 0,
        })} isIconOnly radius="full" onClick={() => {
          prev();
        }} isDisabled={currentImage == 0}>
          <AngleRight className="w-4 rotate-180" fill={currentImage != 0 ?"#42B5FC" : "#3B434F"}/>
        </Button>
        <Button className={clsx("bg-white absolute opacity-100 right-3 z-30", {
          " bg-gray-400" : currentImage == listOfImage.length - 1,
        })} isIconOnly radius="full" onClick={() => {
          next();
        }} isDisabled={currentImage == listOfImage.length - 1}>
          <AngleRight className="w-4" fill={currentImage != listOfImage.length - 1 ?"#42B5FC" : "#3B434F"}/>
        </Button>
        <div className="flex" >
          {
            listOfImage.map((item, index) => {
              return(
                <div className="w-[800px] h-[500px] transition-all rounded-full" style={{transform: `translateX(-${currentImage * 100}%)`}} key={index}>
                  <Image 
                    src={item}
                    fill={true}
                    className="rounded-lg mx-auto my-auto object-cover object-center"
                    alt="test"
                  />
                </div>
              )
            })
          }
        </div>
        <div className="flex absolute  bottom-3 mx-auto w-full justify-center items-center gap-2">
          {listOfImage.map((item, index) => {
            return (
              <div className={clsx("bg-white w-2 h-2 rounded-full opacity-80 transition-all", {
                " scale-150" : index == currentImage,
              })} key={index}>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <header className="text-[60px]  text-white font-bold  text-center xl:text-start xl:text-[80px]">
        LAB CNC 
        </header>
        <section className="mt-3 lg:text-[16px] xl:text-[20px] text-white bg-[#0374BA]  p-8 rounded-[31] grow font-thin border-white border-[2px]">
          <strong>ช็อตดีพาร์ตเมนต์โกะดีไซน์เนอร์ เพนตากอนโทร <br /></strong>
          สะกอมคาปูชิโน รีสอร์ทรอยัลตี้ไทม์สารขัณฑ์พล็อต โบรกเกอร์ไอติม อันตรกิริยาพงษ์โมจิคำตอบ ล้มเหลวเบิร์นบาร์บี้ไวอะกร้า ชาร์จแตงโมคันยิศิรินทร์มายาคติ สตรอเบอรีออร์แกนิกนาฏยศาลา เปโซโยโย่ป่าไม้มาร์ช อุปัทวเหตุจิ๊กโก๋ วินมั้ยโฮป หยวนโนติสซาร์ดีนกรีนม้านั่ง แพลนซิตี้ซากุระดยุกดาวน์ ออดิทอเรียมแชมเปี้ยนเที่ยงวันคองเกรส
        </section>
      </div>
    </article>
  );
}
