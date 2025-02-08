'use client'
import { useState } from "react";
import { AngleDown } from "../icons";
import clsx from "clsx";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function QuestionCard() {
  const [editGrade, setEditGrade] = useState(false);
  const [toggleMoreInfo, setToggleMoreInfo] = useState(false);
  const clearGrade = [false, false, false, false, false, false];
  const [grader, setGrader] = useState(clearGrade);
  const handdleGrader = (level:number) => {
    setGrader(clearGrade);
    const grade: boolean[] = [false, false, false, false, false, false];
    for (let i:number = 0; i < level; i++) {
      grade[i] = true;
    }
    setGrader(grade);
    console.log(grade);
  }
  return (
    <article className="bg-white max-w-[750px] mx-auto mb-12 rounded-xl shadow-md min-[440px]:p-5 max-[440px]:p-3 font-medium">
      <div className="flex gap-5 justify-start items-center max-[440px]:flex-col">
        <p className="font-bold text-xl text-[#3B434F]">ประเภทวัดคำถาม</p>
        <div className="border-red-400 border-[2px] py-2 px-9 rounded-xl text-red-400">
          ยังไม่ได้ให้คะแนน
        </div>
      </div>
      <div className="text-white flex gap-3 mt-7">
        <button className="py-2 px-4 cursor-default bg-primary-400 rounded-xl">วัดความรู้</button>
        <button className="py-2 px-4 cursor-default bg-red-400 rounded-xl">ยาก</button>
      </div>
      <section className="my-10">
        <p className="text-lg mb-4 font-bold text-[#3B434F]">คำถาม</p>
        <p className="leading-7 text-[#3B434F]">
Lorem ipsum odor amet, consectetuer adipiscing elit. Platea sollicitudin elementum malesuada, odio fames litora. Velit viverra iaculis mattis id integer lectus. Conubia eleifend hendrerit integer et aenean congue elit. Adipiscing tristique lobortis enim torquent vehicula nulla porttitor. nuttela num
eleifend hendrerit integer et aenean congue elit. Adipiscing tristique lobortis enim torquent vehicula nulla porttitor. nuttela num
malesuada, odio fames litora. Velit viverra 
        </p>
      </section>
      <div className="flex justify-between w-full">
        <p className="font-bold text-lg text-[#3B434F]">รายละเอียดเพิ่มเติม</p>
        <button className={clsx("transition-all", {
          " rotate-180" : toggleMoreInfo
        })} onClick={() => {
          setToggleMoreInfo(!toggleMoreInfo);
          console.log("Test")
        }}>
          <AngleDown size={25} fill="#3B434F" className="cursor-pointer"/>
        </button>
      </div>
      <div className={clsx("transition-all grid ", {
        " grid-rows-[1fr]" : toggleMoreInfo,
        " grid-rows-[0fr]" : !toggleMoreInfo,
      })}>
        <div className="overflow-hidden mt-4">
          <p className="leading-7 text-[#3B434F]">
            <span className="font-bold mr-4 text-[#3B434F]">คำตอบที่คาดหวัง:</span>ipsum odor amet, consectetuer adipiscing elit. Platea sollicitudin elementum malesuada, odio fames litora. Velit viverra iaculis mattis id integer lectus.  torquent vehicula nulla porttitor. nuttela num
  eleifend hendrerit integer et aenean congue
          </p>
          <Textarea label="ความคิดเห็น" className={clsx("my-8 text-base font-medium",{
            " fixed opacity-0" : !editGrade
          })} classNames={{
              input: "text-base",
            }}/>
          <p className={clsx("my-8 leading-7", {
            " fixed opacity-0" : editGrade
          })}>
            <span className="font-bold mr-4 ">ความคิดเห็น:</span>ipsum odor amet, consectetuer adipiscing elit. Platea sollicitudin elementum malesuada, odio fames litora. Velit viverra iaculis mattis id integer lectus.  torquent vehicula nulla porttitor. nuttela num
  eleifend hendrerit integer et aenean congue
          </p>
          <div className="mt-10 ">
            <p className="font-bold text-lg text-[#3B434F]">ให้คะแนนคำถาม</p>
            <div className={clsx("flex justify-center items-center w-full max-[440px]:gap-1 min-[440px]:gap-5 mt-10", {
              " pointer-events-none" : !editGrade
            })}>
              <button className={clsx("circle-grader p-6", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[0],
              })} onClick={() => {
                handdleGrader(1);
              }}>
                <p className="absolute -top-7 text-zinc-400">ไม่ผ่าน</p>
              </button>
              <button className={clsx("circle-grader p-4", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[1] 
              })} onClick={() => {
                handdleGrader(2);
              }}></button>
              <button className={clsx("circle-grader p-3", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[2] 
              })} onClick={() => {
                handdleGrader(3);
              }}></button>
              <button className={clsx("circle-grader p-3", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[3] 
              })} onClick={() => {
                handdleGrader(4);
              }}></button>
              <button className={clsx("circle-grader p-4", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[4] 
              })} onClick={() => {
                handdleGrader(5);
              }}></button>
              <button className={clsx("circle-grader p-6", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[5] 
              })} onClick={() => {
                handdleGrader(6);
              }}>
                  <p className="absolute -top-7 text-zinc-400 text-nowrap">ผ่าน</p>
              </button>
            </div>
            <div>
              <Button className={clsx("transition-all mt-7  rounded-lg  bg-primary text-white mx-auto block", {
                " fixed opacity-0" : editGrade
              })} onClick={() => {
                setEditGrade(true);
              }}>แก้ไขคะแนน</Button>
              <div className={clsx("transition-all mx-auto max-w-[300px] flex gap-5", {
                " fixed opacity-0" : !editGrade,
                " opacity-100" : editGrade
              })}>
                <Button className="w-full mt-7" color="primary" onClick={() => {
                  setEditGrade(false);
                }}>ยืนยัน</Button>
                <Button className="w-full mt-7 " color="primary" variant="bordered" onClick={() => {
                  setEditGrade(false);
                }}>ยกเลิก</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
