import { loggedInUser } from '@/AppConstants';
import ConfirmAllotment from '@/components/ConfirmAllotment';
import DetailsCard from '@/components/DetailsCard';
import DragAndDrop from '@/components/DragAndDrop';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function Allotment() {



    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const informNotify = () => toast.info("Please select atleast one course!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [allCourses, setAllCourses] = useState([
        // {
        //     id: "",
        //     name: 'Minor 1',
        //     code: 'CS0019',
        //     credits: 4,
        //     department: 'CSE'
        // },  
    ]);

    const [isUserChosenAllotment, setIsUserChosenAllotment] = useState(false);
    const [userDataLoading, setUserDataLoading] = useState(false);

    React.useEffect(() => {
        const fetchCoursesData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/fetchCoursesData');
                const data = response.data;
                console.log(data);
                setAllCourses(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchCoursesData();
    }, []);

    React.useEffect(() => {
        const fetchUserData = async () => {
            setUserDataLoading(true);
            try {
                const response = await axios.get(`/api/fetchUserData?id=${loggedInUser}`);
                const data = response.data;
                console.log(data);
                if (data.choices.length > 0) {
                    setIsUserChosenAllotment(true);
                } else {
                    setIsUserChosenAllotment(false);
                }
                setUserDataLoading(false);
            } catch (error) {
                setUserDataLoading(false);
                console.error(error);
            }
        }
        
        fetchUserData();
    }, []);

    console.log(allCourses);

    const [selectedCourses, setSelectedCourses] = useState([]);

    console.log(selectedCourses);

    const handleNext = () => {
        if (selectedCourses.length === 0) {
            informNotify();
        }
        else {
            setActiveStep(activeStep + 1);
            setStep(step + 1);
        }
    }

    const renderComponent = () => {
        switch (step) {
            case 0:
                return <DetailsCard handleConfirm={handleConfirm} loading={loading} />
            case 1:
                return (
                    <>
                        <DragAndDrop
                            allCourses={allCourses}
                            setAllCourses={setAllCourses}
                            widgets={selectedCourses}
                            setWidgets={(value: any) => setSelectedCourses(value)}
                        />
                        <Footer handleNext={handleNext} loading={loading} />
                    </>
                )
            case 2:
                return (
                    <ConfirmAllotment
                        loading={loading}
                        setLoading={(value: boolean) => setLoading(value)}
                        selectedCourses={selectedCourses}
                    />
                )
        }
    }

    const handleConfirm = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setActiveStep(activeStep + 1);
            setStep(step + 1);
        }, 1000);
    }

    console.log(userDataLoading);

    return (
        <div className={`dark:bg-[#1A202C]`}>
            <Navbar />
            <div className='min-h-screen flex flex-col items-center'>
                {
                    isUserChosenAllotment ? (
                        <div className='w-full min-h-screen pb-20 flex items-center justify-center'>
                            <p className='dark:text-white text-black'>You have already chosen your allotment!</p>
                        </div>
                    ) :
                        (
                            userDataLoading ? (
                                <div className='w-full min-h-screen pb-20 flex items-center justify-center'>
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                <>
                                    <div className='my-10'>
                                        <Stepper activeStep={activeStep} />
                                    </div>
                                    {
                                        renderComponent()
                                    }
                                </>
                            )
                        )
                }
            </div>
            <ToastContainer />
        </div>
    )
}