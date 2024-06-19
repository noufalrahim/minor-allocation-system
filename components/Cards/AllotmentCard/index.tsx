import React from 'react'
import { FaArrowLeft, FaArrowRight, FaClosedCaptioning, FaCross } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

interface AllotmentCardProps {
    course: {
        name: string;
        code: string;
        credit: number;
        department: string;
    };
    showLeftIcon?: boolean;
    showRightIcon?: boolean;
    showCloseIcon?: boolean;
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
}

export default function AllotmentCard({
    course,
    showCloseIcon,
    showLeftIcon,
    showRightIcon,
    onLeftIconClick,
    onRightIconClick,
}: AllotmentCardProps) {
    return (
        <div className={`p-2 dark:bg-[#1A202C] bg-[#D4DDFF] mx-5 px-2 flex flex-row gap-4`}>
            {
                showLeftIcon && (
                    <button className="">
                        <FaArrowLeft
                            className='dark:text-white text-black'
                            onClick={onLeftIconClick}
                        />
                    </button>
                )
            }
            <div className='w-full'>
                <p className="dark:text-white text-black text-md font-bold">{course.name}</p>
                <p className="dark:text-[#808080] text-black text-sm font-light">Code: {course.code}</p>
                <p className="dark:text-[#808080] text-black text-sm font-light">Credits: {course.credit}</p>
                <p className="dark:text-[#808080] text-black text-sm font-light">Department: {course.department}</p>
            </div>
            <div className="flex justify-between items-center">
                {
                    showRightIcon && (
                        <button className="">
                            <FaArrowRight
                                className='dark:text-white text-black'
                                onClick={onRightIconClick}
                            />
                        </button>
                    )
                }
            </div>
        </div>
    )
}