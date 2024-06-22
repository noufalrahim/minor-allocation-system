import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import AllotmentCard from "../Cards/AllotmentCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loggedInUser } from "@/AppConstants";

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

    const confirmNotify = () => toast("Allotment Confirmed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const declineNotify = () => toast.error("Allotment Failed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleConfirm = async () => {
        setLoading(true);
        try{
            const response = await axios.patch(`https://minor-nitc-server.onrender.com/students/student/${loggedInUser}/choices`, {
                choices: selectedCourses.map(course => course._id)
            });
            console.log(response);
            if(response.status === 200 && response.data){
                setLoading(false);
                setTimeout(() => {
                    confirmNotify();
                }, 300);
            }else{
                setLoading(false);
                setTimeout(() => {
                    declineNotify();
                }, 300);

            }
        }
        catch(error){
            console.log(error);
            setLoading(false);
            declineNotify();
        }
    }


    return (
        <>
            <div className="min-h-full h-96 w-10/12 lg:w-1/3 xl:w-1/3 md:w-1/3 xl:w-1/3 2xl:w-1/3 dark:bg-[#1F2937] bg-[#A4B8FF] flex flex-col">
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
