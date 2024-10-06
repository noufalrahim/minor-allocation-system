import Image from "next/image";
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

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        // <nav className={`navbar dark:bg-[#171A23] bg-[#D4DDFF] navbar-expand-lg py-5 navbar-light items-center flex justify-between z-10 w-full`}>

        //     <div className="w-1/5 text-center flex items-center justify-center gap-5">
        //         <Link href="/courses">
        //             <div onClick={() => handleNavChange('courses')}>
        //                 <p className={`text-xl cursor-pointer ${selectedNav === 'courses' ? `text-[#4E7396]` : 'dark:text-white text-black'}`}>
        //                     Courses
        //                 </p>
        //             </div>
        //         </Link>
        //         <Link href='/choices'>
        //             <div onClick={() => handleNavChange('choices')}>
        //                 <p className={`text-xl cursor-pointer ${selectedNav === 'choices' ? `text-[#4E7396]` : 'dark:text-white text-black'}`}>
        //                     Choices
        //                 </p>
        //             </div>
        //         </Link>
        //     </div>
        // </nav>

        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className={`text-center w-[3rem] h-[3rem] p-2 dark:bg-white bg-[#171A23] rounded-md justify-center items-center flex`}>
                    <Image src="/Logo.png" width={50} height={50} alt="logo" className="" />
                </div>
                <button
                    onClick={toggleNavbar}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-expanded={isNavOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`w-full md:block md:w-auto ${isNavOpen ? "block" : "hidden"}`}
                    id="navbar-solid-bg"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link
                                href="/courses"
                                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/choices"
                                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Choices
                            </Link>
                        </li>
                        <li>
                            <button
                                className="block py-2 px-3 md:p-0 flex gap-2 flex-row justify-center items-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                onClick={toggleDarkMode}>

                                {darkMode ? <FaMoon color="white" size={18} /> : <FaSun color={'#E69B05'} size={18} />}
                                <span>Theme</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                            }}>
                                <p className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
