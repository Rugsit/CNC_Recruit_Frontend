'use client';

import { useState, useEffect } from 'react'
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import SearchIcon from '@/public/search.svg';
import CandidateCard from '@/components/candidate-card';
import axios from 'axios';

interface Candidate {
  profileUrl: string,
  fullname: string,
  year: string,
  status: string,
  id: number,
}

export default function Page() {
  const [candidates, setCandidates] = useState([]);
  const [year, setYear] = useState(2);
  const [status, setStatus] = useState("all");
  
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          'https://675fc49f1f7ad24269994210.mockapi.io/candidate'
        );
        console.log(response.data);
        setCandidates(response.data);
      } catch (error: any) {
        if (error.response?.status === 404)
          console.error('Candidates not found!');
        else
          console.error('Fetching data failed!');
        setCandidates([]);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div className="flex flex-col gap-y-6 items-center max-w-[1500px] mx-auto pb-12 px-4 pt-44">
      <h3 className="text-center text-3xl text-blue-400 font-bold">รายการผู้สมัคร</h3>
      <Input
        classNames={{
          base: "h-[50px] md:w-[530px] w-full",
          inputWrapper: "p-4 h-full rounded-[30px] shadow-md",
          input: "text-right text-lg",
        }}
        startContent={
          <Image src={SearchIcon} alt="search icon"/>
        }
      />
      <div className="flex gap-x-2 md:justify-end justify-center items-center w-full">
        <p className="text-[#3B434F]">ชั้นปี: </p>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="px-7 py-2 bg-blue-100 text-[#1d9fee] text-center font-bold rounded-lg appearance-none">
          <option value="2">2</option>
        </select>
        <p className="text-[#3B434F]">สถานะ: </p>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-2 py-2 bg-blue-100 text-[#1d9fee] text-center font-bold rounded-lg appearance-none">
          <option value="all">ทั้งหมด</option>
          <option value="approved">อนุมัติแล้ว</option>
          <option value="pending">กำลังดำเนินการ</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 w-full">
        {
          candidates.map((candidate: Candidate, index: number) => {
            console.log(candidate.profileUrl);
            return (
              <CandidateCard key={index} props={candidate} />
            )
          })
        }
      </div>
    </div>
  );
}
