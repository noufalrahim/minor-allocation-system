import ConfirmAllotment from '@/components/ConfirmAllotment';
import DetailsCard from '@/components/DetailsCard';
import DragAndDrop from '@/components/DragAndDrop';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import { useState } from 'react';


export default function Allotment() {



    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(1);

    const [allCourses, setAllCourses] = useState([
        {
            name: 'Minor 1',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 2',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 3',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 4',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 5',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 6',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 7',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 8',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 9',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 10',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        }
    ]);

    const [selectedCourses, setSelectedCourses] = useState([
        {
            name: 'Minor 1',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 2',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 3',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        },
        {
            name: 'Minor 4',
            code: 'CS0019',
            credits: 4,
            department: 'CSE'
        }
    ]);

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
                        />
                        <Footer handleNext={handleConfirm} loading={loading}/>
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

    return (
        <div className={`dark:bg-[#1A202C]`}>
            <Navbar />
            <div className='min-h-screen flex flex-col items-center'>
                <div className='my-10'>
                    <Stepper activeStep={activeStep} />
                </div>
                {renderComponent()}
            </div>
        </div>
    )
}