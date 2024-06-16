import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar bg-[#171A23] navbar-expand-lg py-5 navbar-light bg-light items-center flex justify-center z-10 w-full">
            <div className="w-1/5 text-center flex items-center justify-center gap-5">
                <Link href="/courses">
                    <p className="text-xl cursor-pointer text-white">Courses</p>
                </Link>
                <Link href='/allotment'>
                    <p className="text-xl cursor-pointer text-white">
                        Allotment
                    </p>
                </Link>
            </div>
        </nav>
    )
}