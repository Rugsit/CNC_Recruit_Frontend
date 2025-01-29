'use client';

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react"

export default function NavbarCandidate({onChangeIndex} : {onChangeIndex: (index: number) => void}) {
  const [pageIndex, setPageIndex] = useState(0);
  const handleClick = (index: number) => {
    setPageIndex(index);
    onChangeIndex(index);
  }

  return (
    <nav className="text-bold grid grid-cols-3 w-full max-sm:text-[10px]">
      <Link href={""} className={clsx("max-sm:p-2 sm:p-4 rounded-l-full transition-all flex items-center justify-center", {
        "bg-primary text-white": pageIndex == 0,
        "bg-primary-50 text-zinc-500": pageIndex != 0
      })} onClick={
        () => {
          handleClick(0);
        }}>ข้อมูลผู้สมัคร</Link>
      <Link href={""} className={clsx("max-sm:p-2 sm:p-4  transition-all text-center flex items-center justify-center", {
        "bg-primary text-white": pageIndex == 1,
        "bg-primary-50 text-zinc-500": pageIndex != 1
      })} onClick={() => {
        handleClick(1)
      }}>คำถามห้องทัศนคติ</Link>
      <Link href={""} className={clsx("max-sm:p-2 sm:p-4  rounded-r-full transition-all text-center flex items-center justify-center", {
        "bg-primary text-white": pageIndex == 2,
        "bg-primary-50 text-zinc-500": pageIndex != 2
      }
      )} onClick={() => {
        handleClick(2)
      }}>คำถามห้องวัดความรู้</Link>
    </nav>
  )
}
