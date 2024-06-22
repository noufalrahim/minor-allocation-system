import React from 'react';

interface CoursesCardProps {
    course: {
        name: string;
        code: string;
        department: string;
        faculty: string;
        facultyEmail: string;
        credit: number;
        description: string;
        schedule: string;
    };
}

export default function CoursesCard({ course }: CoursesCardProps) {
    return (
        <div className={`dark:bg-[#171A23] bg-[#D4DDFF] shadow p-4 rounded-lg`}>
            <h2 className={`text-xl font-bold dark:text-white text-black`}>{course.name}</h2>
            <p className="text-sm text-gray-500">Credit: {course.credit}</p>
            <p className="text-sm text-gray-500">Code: {course.code}</p>
            <p className="text-sm text-gray-500">Department: {course.department}</p>
            <p className="text-sm text-gray-500">Faculty: {course.faculty}</p>
            <p className="text-sm text-gray-500">Email: {course.facultyEmail}</p>
            <p className="text-sm text-gray-500">Description: {course.description}</p>
            <p className="text-sm text-gray-500">Schedule: {course.schedule}</p>
        </div>
    )
}