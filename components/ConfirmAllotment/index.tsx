import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import AllotmentCard from "../Cards/AllotmentCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ConfirmAllotmentProps {
    loading: boolean;
    setLoading: any;
    selectedCourses: any[];
}

export default function ConfirmAllotment({
    loading,
    setLoading,
    selectedCourses
}: ConfirmAllotmentProps) {

    const notify = () => toast("Allotment Confirmed!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleConfirm = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            notify();
        }, 2000);
    }


    return (
        <>
            <div className="h-96 w-1/3 bg-[#1F2937] flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <div className="flex flex-col gap-4 my-5">
                        {
                            selectedCourses.map((course, index) => (
                                <AllotmentCard key={index} course={course} />
                            ))
                        }
                    </div>
                </div>
                <div className="w-full">
                    <button className="bg-[#4E7396] w-full py-3 justify-center items-center flex text-white font-bold" onClick={handleConfirm}>
                        {
                            loading ? <LoadingSpinner /> : 'Confirm Allotment'
                        }
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
