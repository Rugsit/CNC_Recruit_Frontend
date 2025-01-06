'use client'
import Image, { StaticImageData } from "next/image";
import image1 from "@/public/images/image_1.jpg"
import image2 from "@/public/images/image_2.jpg"
import image3 from "@/public/images/image_3.jpg"
import image4 from "@/public/images/image_4.jpg"
import image5 from "@/public/images/image_5.jpg"
import { AngleRight } from "./icons";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import clsx from "clsx";

export default function HomeDetails() {
  const listOfImage:StaticImageData[] = [image1, image2, image3, image4, image5];
  const [currentImage, setCurrentImage] = useState(0);
  const next = () => {
    if (currentImage + 1 >= listOfImage.length) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  const prev = () => {
    if (currentImage - 1 < 0) {
      setCurrentImage(listOfImage.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }
  return (
    <article className="grid max-md:grid-rows-[auto_auto] max-md:grid-cols-1 lg:grid-cols-[minmax(auto,_500px)_minmax(auto,_500px)] gap-10 w-full max-lg:max-w-[500px] mx-auto max-w-fit my-[500px]">
      <div className="relative flex items-center overflow-hidden rounded-lg" >
        <Button className="bg-white absolute opacity-80 left-3 z-30" isIconOnly radius="full" onClick={() => {
          prev();
        }}>
          <AngleRight className="w-4 rotate-180" fill="#42B5FC"/>
        </Button>
        <Button className="bg-white absolute opacity-80 right-3 z-30" isIconOnly radius="full" onClick={() => {
          next();
        }}>
          <AngleRight className="w-4 " fill="#42B5FC"/>
        </Button>
        <div className="flex" >
          {
            listOfImage.map((item, index) => {
              return(
                <div className="relative w-[500px] h-[500px] transition-all rounded-full" style={{transform: `translateX(-${currentImage * 100}%)`}} key={index}>
                  <Image 
                    src={item}
                    fill={true}
                    className="rounded-lg mx-auto my-auto object-cover"
                    alt="test"
                  />
                </div>
              )
            })
          }
        </div>
        <div className="flex absolute  bottom-3 mx-auto w-full justify-center gap-2 items-center">
          {listOfImage.map((item, index) => {
            return (
              <div className={clsx("bg-white w-2 h-2 rounded-full opacity-80 transition-all", {
                " p-2" : index == currentImage,
              })} key={index}>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="text-[30px] text-white bg-primary text-center w-full rounded-[31] py-6">
        Lab CNC คืออะไร?
        </header>
        <section className="mt-8 lg:text-[16px] xl:text-[20px] text-white bg-primary p-8 rounded-[31] grow font-thin">
          <strong>ช็อตดีพาร์ตเมนต์โกะดีไซน์เนอร์ เพนตากอนโทร <br /></strong>
          สะกอมคาปูชิโน รีสอร์ทรอยัลตี้ไทม์สารขัณฑ์พล็อต โบรกเกอร์ไอติม อันตรกิริยาพงษ์โมจิคำตอบ ล้มเหลวเบิร์นบาร์บี้ไวอะกร้า ชาร์จแตงโมคันยิศิรินทร์มายาคติ สตรอเบอรีออร์แกนิกนาฏยศาลา เปโซโยโย่ป่าไม้มาร์ช อุปัทวเหตุจิ๊กโก๋ วินมั้ยโฮป หยวนโนติสซาร์ดีนกรีนม้านั่ง แพลนซิตี้ซากุระดยุกดาวน์ ออดิทอเรียมแชมเปี้ยนเที่ยงวันคองเกรส
        </section>
      </div>
    </article>
  );
}
