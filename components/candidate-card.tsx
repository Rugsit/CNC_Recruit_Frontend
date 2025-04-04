import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CandidateCardProps {
  imageUrl: string;
  name: string;
  lastname: string;
  year: string;
  id: number;
}

export default function CandidateCard({
  imageUrl,
  name,
  lastname,
  year,
  id,
}: CandidateCardProps) {
  return (
    <Link
      className='flex items-center gap-x-6 gap-y-4 px-4 py-2 bg-white rounded-xl shadow-lg hover:scale-105 transition-all'
      href={`/admin/candidate-list/${id}`}
    >
      <Image
        alt='profile-image'
        className='aspect-square shadow-sm rounded-full object-cover'
        height={100}
        src={imageUrl}
        width={100}
      />
      <div className='flex flex-col overflow-hidden'>
        <p className='text-lg text-blue-400 font-bold'>{`${name} ${lastname}`}</p>
        <p className='text-[#3B434F] font-bold'>ชั้นปี: {year}</p>
      </div>
    </Link>
  );
}
