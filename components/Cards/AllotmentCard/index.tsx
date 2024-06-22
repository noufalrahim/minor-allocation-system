import React from 'react'
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaClosedCaptioning, FaCross } from 'react-icons/fa';
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
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
}

export default function AllotmentCard({
    course,
    showLeftIcon,
    showRightIcon,
    onLeftIconClick,
    onRightIconClick,
}: AllotmentCardProps) {

    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth])

    return (
        <div className={`p-2 dark:bg-[#1A202C] bg-[#D4DDFF] mx-5 px-2 flex flex-row gap-4`}>
            {
                showLeftIcon && (
                    <button>
                       {
                            windowWidth > 766 ? (
                                 <FaArrowLeft
                                      className='dark:text-white text-black'
                                      onClick={onLeftIconClick}
                                 />
                            ) : (
                                 <FaArrowUp
                                      className='dark:text-white text-black'
                                      onClick={onLeftIconClick}
                                 />
                            )
                       }
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
                            {
                                windowWidth > 766 ? (
                                    <FaArrowRight
                                        className='dark:text-white text-black'
                                        onClick={onRightIconClick}
                                    />
                                ) : (
                                    <FaArrowDown
                                        className='dark:text-white text-black'
                                        onClick={onRightIconClick}
                                    />
                                )
                            }
                        </button>
                    )
                }
            </div>
        </div>
    )
}