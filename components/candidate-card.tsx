import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export interface CandidateCardProps {
    profileUrl: string, 
    name: string, 
    lastname: string, 
    year: string, 
    id: number,
};

export default function CandidateCard({ profileUrl, name, lastname, year, id }: CandidateCardProps) {
    return (
        <Link href={`/candidate-list/${id}`} className="flex items-center gap-x-6 gap-y-4 px-4 py-2 rounded-xl shadow-md">
            <Image
                src={profileUrl}
                alt="profile-image"
                width={70}
                height={70}
                className="aspect-square rounded-full"
            />
            <div className="flex flex-col">
                <p className="text-lg text-blue-400 font-bold">{`${name} ${lastname}`}</p>
                <p className="text-[#3B434F] font-bold">ชั้นปี: {year}</p>
            </div>
        </Link>
    );
}
