import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function CandidateCard({ props }: { props: { profileUrl: string, fullname: string, year: string, status: string } }) {
    const { profileUrl, fullname, year, status } = props;

    return (
        <Link href='/' className="flex items-center gap-x-6 gap-y-4 px-4 py-2 rounded-xl shadow-md">
            <Image 
                src={profileUrl} 
                alt="profile-image" 
                width={70} 
                height={70}
                className="aspect-square rounded-full"
            />
            <div className="flex flex-col">
                <p className="text-lg text-blue-400 font-bold">{fullname}</p>
                <p>ชั้นปี: {year}</p>
                <p>สถานะ: {status}</p>
            </div>
        </Link>
    )
}
