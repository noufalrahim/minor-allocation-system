import { loggedInUser } from '@/AppConstants';
import CoursesCard from '@/components/Cards/CoursesCard';
import ConfirmAllotment from '@/components/ConfirmAllotment';
import DetailsCard from '@/components/DetailsCard';
import DragAndDrop from '@/components/DragAndDrop';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import axios, { all } from 'axios';
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

    const [studentData, setStudentData] = useState({
        name: '',
        regNo: '',
        faName: '',
        email: '',
        programName: '',
        semester: '',
        cgpa: '',
        sgpaS1: '',
        sgpaS2: ''
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
    const [userAlloted, setUserAlloted] = useState({
        isAlloted: false,
        result: ''
    });
    const [isInititalRender, setIsInitialRender] = useState(true);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/fetchUserData?id=${loggedInUser}`);
            const data = response.data;
            if (data.choices.length > 0) {
                setIsUserChosenAllotment(true);
            } else {
                setIsUserChosenAllotment(false);
            }
            console.log(data.enrolled);
            if (data.enrolled != -1) {
                setUserAlloted({
                    isAlloted: true,
                    result: data.enrolled
                });
            }
            else {
                setUserAlloted({
                    isAlloted: false,
                    result: 'none'
                });
            }
            setLoading(false);
            setStudentData(data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

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
            setLoading(false);
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchCoursesData();
        fetchUserData();
        setIsInitialRender(false);
    }, []);

    const [allotedCourse, setAllotedCourse] = useState({
        name: '',
        code: '',
        department: '',
        faculty: '',
        facultyEmail: '',
        credit: 0,
        description: '',
        schedule: '',
    });


    const fetchAllotedCourse = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://minor-nitc-server.onrender.com/minors/minor/${userAlloted.result}`);
            const data = response.data;
            console.log(data);
            setAllotedCourse(data);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    React.useEffect(() => {
        if (userAlloted.isAlloted) {
            fetchAllotedCourse();
        }
    }, [userAlloted]);

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
                return (
                    <DetailsCard 
                        handleConfirm={handleConfirm} 
                        loading={loading} 
                        setLoading={(value: boolean) => setLoading(value)} 
                        studentData={studentData}
                    />
                )
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


    if (loading || isInititalRender) {
        return (
            <div className={`dark:bg-[#1A202C]`}>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }

    const renderItem = () => {
        if (userAlloted.isAlloted && !loading) {
            return (
                <div className='max-w-2xl mx-5 min-h-screen pb-20 flex flex-col gap-4 items-center justify-center'>
                    <p className='text-lg dark:text-white text-black text-center'>
                        Congratulations!<br />
                        You have been alloted to the following course:</p>
                    <CoursesCard course={allotedCourse} />
                </div>
            )
        } else {
            if (isUserChosenAllotment && !loading) {
                return (
                    <div className='w-full min-h-screen pb-20 flex items-center justify-center'>
                        <p className='dark:text-white text-black'>You have already chosen your allotment!</p>
                    </div>
                )
            }
            else if(!loading) {
                return (
                    <>
                        <div className='my-10'>
                            <Stepper activeStep={activeStep} />
                        </div>
                        {
                            renderComponent()
                        }
                    </>
                )
            }
        }
    }

    return (
        <div className={`dark:bg-[#1A202C]`}>
            <Navbar />
            <h1 className='text-white'>f'jqi
                wfpqwofp
                oqjw
                f[ojwq
                f[ojqw[fj[qwo
                fjwq[f[wj[f
                qwpfqw]pf[pw[wqj[fopjqw[fjqw[fpjqw]]]]]]]]]]]]
            </h1>
            <div className='min-h-screen flex flex-col items-center'>
                {
                    renderItem()
                }
            </div>
            <ToastContainer />
        </div>
    )
}