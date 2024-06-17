import React from 'react'

interface AllotmentCardProps {
    course: {
        name: string;
        code: string;
        credits: number;
        department: string;
    };
}

export default function AllotmentCard({
    course,
}: AllotmentCardProps) {
    return (
        <div className={`p-2 dark:bg-[#1A202C] bg-[#D4DDFF] mx-6`}>
            <p className="dark:text-white text-black text-md font-bold">{course.name}</p>
            <p className="dark:text-[#808080] text-black text-sm font-light">Code: {course.code}</p>
            <p className="dark:text-[#808080] text-black text-sm font-light">Credits: {course.credits}</p>
            <p className="dark:text-[#808080] text-black text-sm font-light">Department: {course.department}</p>
        </div>
    )
}