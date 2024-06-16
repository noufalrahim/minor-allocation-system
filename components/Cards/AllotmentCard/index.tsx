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
        <div className="p-2 bg-[#171A23] mx-6">
            <p className="text-white text-md font-bold">{course.name}</p>
            <p className="text-[#808080] text-sm font-light">Code: {course.code}</p>
            <p className="text-[#808080] text-sm font-light">Credits: {course.credits}</p>
            <p className="text-[#808080] text-sm font-light">Department: {course.department}</p>
        </div>
    )
}