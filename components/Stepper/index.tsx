import React from 'react';
import Divider from './Divider';
import Step from './Step';

interface StepperProps {
    activeStep: number;
}

export default function Stepper({ activeStep }: StepperProps) {
    return (
        <div className={`flex items-center justify-center my-5 md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] w-[15rem]`}>
            <Step number={1} isActive={activeStep >= 1} />
            <Divider isCompleted={activeStep > 1} />
            <Step number={2} isActive={activeStep >= 2} />
            <Divider isCompleted={activeStep > 2} />
            <Step number={3} isActive={activeStep === 3} />
        </div>
    )
}