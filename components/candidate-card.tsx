import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CandidateCardProps {
  profileUrl: string;
  name: string;
  lastname: string;
  year: string;
  id: number;
}

export default function CandidateCard({
  profileUrl,
  name,
  lastname,
  year,
  id,
}: CandidateCardProps) {
  return (
    <Link
      className='flex items-center gap-x-6 gap-y-4 px-4 py-2 bg-white rounded-xl shadow-lg hover:scale-105 transition-all'
      href={`/candidate-list/${id}`}
    >
      <Image
        alt='profile-image'
        className='aspect-square rounded-full'
        height={70}
        src={profileUrl}
        width={70}
      />
      <div className='flex flex-col'>
        <p className='text-lg text-blue-400 font-bold'>{`${name} ${lastname}`}</p>
        <p className='text-[#3B434F] font-bold'>ชั้นปี: {year}</p>
      </div>
    </Link>
  );
}
