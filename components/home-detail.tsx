import Image from "next/image";
import testimage from "../public/cnc_detail.jpg"

export default function HomeDetails() {
  return (
    <article className="grid max-md:grid-rows-[auto_auto] max-md:grid-cols-1 lg:grid-cols-[minmax(auto,_500px)_minmax(auto,_500px)] gap-10 w-full max-lg:max-w-[500px] mx-auto max-w-fit">
      <Image 
        src={testimage}
        width={500}
        height={500}
        className="rounded-lg mx-auto my-auto"
        alt="test"
      />
      <div className="flex flex-col">
        <header className="text-[30px] text-white bg-primary text-center w-full rounded-[31] py-6">
        Lab CNC คืออะไร?
        </header>
        <section className="mt-8 lg:text-[16px] xl:text-[20px] text-white bg-primary p-8 rounded-[31] grow">
          <strong>ช็อตดีพาร์ตเมนต์โกะดีไซน์เนอร์ เพนตากอนโทร <br /></strong>
          สะกอมคาปูชิโน รีสอร์ทรอยัลตี้ไทม์สารขัณฑ์พล็อต โบรกเกอร์ไอติม อันตรกิริยาพงษ์โมจิคำตอบ ล้มเหลวเบิร์นบาร์บี้ไวอะกร้า ชาร์จแตงโมคันยิศิรินทร์มายาคติ สตรอเบอรีออร์แกนิกนาฏยศาลา เปโซโยโย่ป่าไม้มาร์ช อุปัทวเหตุจิ๊กโก๋ วินมั้ยโฮป หยวนโนติสซาร์ดีนกรีนม้านั่ง แพลนซิตี้ซากุระดยุกดาวน์ ออดิทอเรียมแชมเปี้ยนเที่ยงวันคองเกรส
        </section>
      </div>
    </article>
  );
}
