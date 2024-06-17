import React from 'react';

interface StepProps {
    number: number;
    isActive: boolean;
}

export default function Step({ number, isActive }: StepProps) {
    return (
        <div
            className={`relative flex-shrink-0 w-12 h-12 mx-2 ${isActive ? 'dark:bg-[#171A23] bg-[#A4B8FF]' : 'dark:bg-[#1F2937] bg-[#D4DDFF]'}  rounded-full flex items-center justify-center`}
        >
            <span className='dark:text-white text-black'>{number}</span>
        </div>
    )
}