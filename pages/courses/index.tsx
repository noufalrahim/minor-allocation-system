import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { db } from '../../DB/db'
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import CoursesCard from "@/components/Cards/CoursesCard";

export default function Courses() {
    const [coursesList, setCoursesList] = useState([
        {
            "_id": "",
            "name": "",
            "code": "",
            "department": "",
            "faculty": "",
            "facultyEmail": "",
            "credit": 0,
            "description": "",
            "schedule": "",
        }
    ]);

    const [isLoading, setIsLoading] = useState(true);

    const fetchCoursesData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/fetchCoursesData');
            const data = response.data;
            console.log(data);
            setCoursesList(data);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchCoursesData();
    }, [])

    if (isLoading) {
        return (
            <div className={`dark:bg-[#1A202C]`}>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }

    return (
        <div className={`dark:bg-[#1A202C]`}>
            <Navbar />
            <div className="flex justify-center min-h-screen pb-10 mx-5">
                <div className="w-full max-w-2xl">
                    <h1 className={`text-3xl font-bold text-center mb-10 dark:text-white text-black mt-10`}>Courses</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {coursesList.map((course) => (
                            <CoursesCard key={course._id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
