import React from 'react';

interface StepProps {
    number: number;
    isActive: boolean;
}

export default function Step({ number, isActive }: StepProps) {
    return (
        <div
            className={`relative flex-shrink-0 w-12 h-12 mx-2 bg-${isActive ? '[#171A23]' : '[#1F2937]'}  rounded-full flex items-center justify-center`}
        >
            <span className='text-white'>{number}</span>
        </div>
    )
}