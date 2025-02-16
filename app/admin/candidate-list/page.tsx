'use client';

import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import SearchIcon from '@/public/search.svg';
import CandidateCard, { CandidateCardProps } from '@/components/candidate-card';

interface CandidateFilter {
  keyword: string;
  year: number;
}

export default function Page() {
  const [candidates, setCandidates] = useState<CandidateCardProps[]>([]);
  const [year, setYear] = useState<number>(0);
  const { data, status } = useSession();

  // console.log(data?.backendToken);

  const fetchCandidates = async (keyword: string, year: number) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/nisit/',
        { keyword, year } as CandidateFilter,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );

      setCandidates(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCandidates('', year);
    }
  }, [status, data?.backendToken, year]);

  return (
    <div className='flex flex-col gap-y-6 items-center max-w-[1500px] mx-auto pb-12 px-4 pt-44 min-h-screen'>
      <h3 className='text-center text-3xl text-blue-400 font-bold'>
        รายการผู้สมัคร
      </h3>
      <Input
        classNames={{
          base: 'h-[50px] md:w-[530px] w-full',
          inputWrapper:
            'p-4 h-full bg-white rounded-[30px] inset-shadow-lg transition-all focus-within:ring-2 focus-within:ring-blue-500',
          input: 'text-left text-lg',
        }}
        startContent={
          <Image
            alt='search icon'
            src={SearchIcon}
          />
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const input = (e.target as HTMLInputElement).value;

            fetchCandidates(input, year);
          }
        }}
      />
      <div className='flex gap-x-2 md:justify-end justify-center items-center w-full'>
        <p className='text-[#3B434F]'>KU รุ่นที่: </p>
        <select
          className='px-7 py-2 bg-blue-100 text-[#1d9fee] text-center font-bold rounded-lg transition-all hover:scale-95 appearance-none'
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          <option value='0'>ทั้งหมด</option>
          <option value='83'>83</option>
          <option value='84'>84</option>
        </select>
      </div>
      {status === 'loading' ? (
        <section className='flex flex-grow flex-col gap-y-5 justify-center items-center'>
          <div className='w-16 h-16 border-5 border-[#42B5FC] border-t-transparent rounded-full animate-spin' />
          <h1 className='text-[#42B5FC] text-xl font-bold'>
            กำลังโหลดรายการผู้สมัคร...
          </h1>
        </section>
      ) : (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 w-full'>
          {candidates &&
            candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                {...candidate}
              />
            ))}
        </div>
      )}
    </div>
  );
}
