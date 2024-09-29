import React from 'react';

interface CoursesCardProps {
    course: {
        name: string;
        faculty: string;
        facultyEmail: string;
        description: string;
    };
}

export default function CoursesCard({ course }: CoursesCardProps) {
    return (
        <div className={`dark:bg-[#171A23] bg-[#D4DDFF] shadow p-4 rounded-lg gap-2 flex flex-col`}>
            <h2 className={`text-xl font-bold dark:text-white text-black`}>{course.name}</h2>
            <p className="text-sm text-gray-500">Faculty: {course.faculty}</p>
            <p className="text-sm text-gray-500">Email: {course.facultyEmail}</p>
            <p className="text-sm text-gray-500">Description: {course.description}</p>
        </div>
    )
}