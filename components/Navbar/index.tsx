import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedNav, setSelectedNav] = useState('courses');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.classList.add('dark');
                setDarkMode(true);
            } else {
                document.documentElement.classList.remove('dark');
                setDarkMode(false);
            }

            const savedNav = localStorage.getItem('selectedNav') || 'courses';
            // const savedNav = 'courses';
            setSelectedNav(savedNav);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    const handleNavChange = (nav: string) => {
        localStorage.setItem('selectedNav', nav);
        setSelectedNav(nav);
    };


    return (
        <nav className={`navbar dark:bg-[#171A23] bg-[#D4DDFF] navbar-expand-lg py-5 navbar-light items-center flex justify-between z-10 w-full`}>
            <div className={`text-center mx-10 w-[2rem] h-[2rem] dark:bg-white bg-[#171A23] rounded-full justify-center items-center flex`}>
                <p className="text-white dark:text-black text-[10px]">Logo</p>
            </div>
            <div className="w-1/5 text-center flex items-center justify-center gap-5">
                <Link href="/courses">
                    <div onClick={() => handleNavChange('courses')}>
                        <p className={`text-xl cursor-pointer ${selectedNav === 'courses' ? `text-[#4E7396]` : 'dark:text-white text-black'}`}>
                            Courses
                        </p>
                    </div>
                </Link>
                <Link href='/choices'>
                    <div onClick={() => handleNavChange('choices')}>
                        <p className={`text-xl cursor-pointer ${selectedNav === 'choices' ? `text-[#4E7396]` : 'dark:text-white text-black'}`}>
                            Choices
                        </p>
                    </div>
                </Link>
            </div>
            <div className="text-center mr-10 flex flex-row items-center justify-center">
                <button onClick={toggleDarkMode}>
                    {darkMode ? <FaMoon color="white" size={24}/> : <FaSun color={'#E69B05'} size={24}/>}
                </button>
                <button className="ml-5" onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                }}>
                    <p className="text-xl dark:text-white text:black">Logout</p>
                </button>
            </div>
        </nav>
    )
}
