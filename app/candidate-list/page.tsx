'use client';

import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import SearchIcon from '@/public/search.svg';
import CandidateCard, { CandidateCardProps } from '@/components/candidate-card';
import axios from 'axios';

interface CandidateFilter {
    keyword: string;
    year: number;
}

export default function Page() {
    const [candidates, setCandidates] = useState<CandidateCardProps[]>([]);
    const [year, setYear] = useState<number>(0);

    const fetchCandidates = async (keyword: string, year: number) => {
        try {
            const response = await axios.post('http://localhost:8000/nisit/', { keyword, year } as CandidateFilter);
            setCandidates(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchCandidates("", year);
    }, [year]);

    return (
        <div className="flex flex-col gap-y-6 items-center max-w-[1500px] mx-auto pb-12 px-4 pt-44">
            <h3 className="text-center text-3xl text-blue-400 font-bold">รายการผู้สมัคร</h3>
            <Input
                classNames={{
                    base: "h-[50px] md:w-[530px] w-full",
                    inputWrapper: "p-4 h-full rounded-[30px] shadow-md",
                    input: "text-center text-lg",
                }}
                startContent={
                    <Image src={SearchIcon} alt="search icon" />
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const input = (e.target as HTMLInputElement).value;
                        fetchCandidates(input, year);
                    }
                }}
            />
            <div className="flex gap-x-2 md:justify-end justify-center items-center w-full">
                <p className="text-[#3B434F]">ปีการศึกษา: </p>
                <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="px-7 py-2 bg-blue-100 text-[#1d9fee] text-center font-bold rounded-lg appearance-none"
                >
                    <option value="0">ทั้งหมด</option>
                    <option value="1">84</option>
                </select>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8 w-full">
                {
                  candidates && candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))
                }
            </div>
        </div>
    );
}
