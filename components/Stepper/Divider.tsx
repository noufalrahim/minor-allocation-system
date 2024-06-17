import React from 'react'

interface DividerProps {
    isCompleted: boolean;
}

export default function Divider({ isCompleted }: DividerProps) {
    return (
        <div className='flex-1 relative'>
            <div className={`h-1 absolute inset-0 ${isCompleted ? `dark:bg-[#171A23] bg-[#A4B8FF]` : `dark:bg-[#1F2937] bg-[#D4DDFF]`}`}></div>
        </div>
    )
}