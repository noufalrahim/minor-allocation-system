import Navbar from "@/components/Navbar";
import { useState } from "react";
import { db } from '../../DB/db'

export default function Courses() {
    const [coursesList, setCoursesList] = useState(db);
    return (
        <div className="bg-[#1A202C]">
            <Navbar />
            <div className="flex justify-center min-h-screen">
                <div className="w-full max-w-2xl">
                    <h1 className="text-3xl font-bold text-center mb-10 text-white mt-10">Courses</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {coursesList.map((course) => (
                            <div key={course.id} className="bg-[#171A23] text-white shadow p-4 rounded-lg">
                                <h2 className="text-xl font-bold">{course.name}</h2>
                                <p className="text-sm text-gray-500">Credit: {course.credit}</p>
                                <p className="text-sm text-gray-500">Type: {course.type}</p>
                                <p className="text-sm text-gray-500">Department: {course.department}</p>
                                <p className="text-sm text-gray-500">Faculty: {course.faculty}</p>
                                <p className="text-sm text-gray-500">Email: {course.facultyEmail}</p>
                                <p className="text-sm text-gray-500">Phone: {course.facultyPhone}</p>
                                <p className="text-sm text-gray-500">Description: {course.description}</p>
                                <p className="text-sm text-gray-500">Schedule: {course.schedule.day.join(', ')} {course.schedule.time} {course.schedule.location}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
