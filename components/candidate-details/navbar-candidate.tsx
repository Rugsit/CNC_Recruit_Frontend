'use client'
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react"

export default function NavbarCandidate() {
  const [activeButton, setActiveButton] = useState({details: true, knowledge: false, attitude: false});
  const handdleClick = (targetButton:string) => {
    if (targetButton === "details") {
      setActiveButton({details: true, knowledge: false, attitude: false});
    } else if (targetButton === "knowledge") {
      setActiveButton({details: false, knowledge: true, attitude: false});
    } else if (targetButton === "attitude") {
      setActiveButton({details: false, knowledge: false, attitude: true});
    }
  }
  return (
    <nav className="text-bold grid grid-cols-3 w-full max-sm:text-[10px]">
      <Link href={""} className={clsx("max-sm:p-2 sm:p-4 rounded-l-full transition-all flex items-center justify-center", {
          "bg-primary text-white" : activeButton.details,
          "bg-primary-50 text-zinc-500" : !activeButton.details
        })} onClick={
          () => {
            handdleClick("details")
        }}>ข้อมูลผู้สมัคร</Link>
      <Link href={""} className={clsx("max-sm:p-2 sm:p-4  transition-all text-center flex items-center justify-center", {
        "bg-primary text-white" : activeButton.attitude,
        "bg-primary-50 text-zinc-500" : !activeButton.attitude
      })} onClick={() => {
        handdleClick("attitude")
      }}>คำถามห้องทัศนคติ</Link>
      <Link href={""} className={clsx("max-sm:p-2 sm:p-4  rounded-r-full transition-all text-center flex items-center justify-center", {
        "bg-primary text-white": activeButton.knowledge,
        "bg-primary-50 text-zinc-500" : !activeButton.knowledge
      }
    )} onClick={() =>{
        handdleClick("knowledge")
      }}>คำถามห้องวัดความรู้</Link>
    </nav>
  )
}
