import React from 'react'
import { FaChevronCircleDown, FaArrowLeft, FaArrowRight, FaChevronCircleUp } from 'react-icons/fa';

interface PreferenceCardProps {
    key: number
    course: {
        name: string;
        faculty: string;
        facultyEmail: string;
        description: number;
    };
    index: number;
    showLeftIcon?: boolean;
    showRightIcon?: boolean;
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
    showUpIcon?: boolean;
    showDownIcon?: boolean;
    onUpClick?: () => void;
    onDownClick?: () => void;
}

export default function PreferenceCard({
    key,
    index,
    course,
    showLeftIcon,
    showRightIcon,
    onLeftIconClick,
    onRightIconClick,
    showUpIcon,
    showDownIcon,
    onUpClick,
    onDownClick
}: PreferenceCardProps) {

    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className={`p-2 dark:bg-[#1A202C] bg-[#D4DDFF] mx-5 px-2 flex flex-row gap-4 items-center`}>
            {
                showLeftIcon && (
                    <button onClick={onLeftIconClick}>
                        {
                            windowWidth > 766 ? (
                                <FaArrowLeft className='dark:text-white text-black w-5 h-5' size={12}/>
                            ) : (
                                <FaChevronCircleUp className='dark:text-white text-black w-5 h-5' size={12}/>
                            )
                        }
                    </button>
                )
            }
            <div className='w-full flex flex-col gap-2'>
                <p className="dark:text-white text-black text-md font-bold">{index + 1}{" . "}{course.name}</p>
                <p className="dark:text-[#808080] text-black text-sm font-light">Faculty: {course.faculty}</p>
                <p className="dark:text-[#808080] text-black text-sm font-light">Faculty Email: {course.facultyEmail}</p>
                {/* <p className="dark:text-[#808080] text-black text-sm font-light">Description: {course.description}</p> */}
            </div>

            <div className="flex flex-row justify-center items-center">
                {
                    showUpIcon && (
                        <button onClick={onUpClick}>
                            <FaChevronCircleUp className='dark:text-white text-black w-5 h-5' />
                        </button>
                    )
                }
                {
                    showDownIcon && (
                        <button onClick={onDownClick}>
                            <FaChevronCircleDown className='dark:text-white text-black ml-1 w-5 h-5' />
                        </button>
                    )
                }
            </div>
            {
                showRightIcon && (
                    <button onClick={onRightIconClick}>
                        {
                            windowWidth > 766 ? (
                                <FaArrowRight className='dark:text-white text-black w-5 h-5' size={12}/>
                            ) : (
                                <FaChevronCircleDown className='dark:text-white text-black w-5 h-5 'size={12} />
                            )
                        }
                    </button>
                )
            }
        </div>
    )
}
