import LoadingSpinner from "../LoadingSpinner";
import Fields from "./Fields";
import React from "react";

interface DetailsCardProps {
    handleConfirm: () => void;
    loading: boolean;
}

export default function DetailsCard(
    {
        handleConfirm,
        loading,
    }: DetailsCardProps
) {

    const [fields, setFields] = React.useState([
        { label: "Name", value: "Noufal Rahim" },
        { label: "Roll No", value: "B220444CS" },
        { label: "Faculty Advisor", value: "Dr. Manjusha" },
        { label: "Email", value: "noufal_b220444cs@nitc.ac.in" },
        { label: "Department", value: "B.Tech in Computer Science and Engineering" },
        { label: "Semester", value: "Semester 5" },
        { label: "Overall CGPA", value: "10.00" },
        { label: "SGPA 1", value: "10.00" },
        { label: "SGPA 2", value: "10.00" },
    ])

    return (
        <div className="dark:bg-[#1F2937] bg-[#D4DDFF] h-80 px-20 flex flex-col rounded-lg text-white shadow-lg w-[60rem]">
            <div className="flex flex-row justify-between items-center h-full mt-5">
                <div className="justify-around items-start flex h-full flex-col">
                {
                    fields.slice(0, 3).map((field, index) => (
                        <Fields key={index} label={field.label} value={field.value} />
                    ))
                }
                </div>
                <div className="justify-around items-start flex h-full flex-col">
                    {
                        fields.slice(3, 6).map((field, index) => (
                            <Fields key={index} label={field.label} value={field.value} />
                        ))
                    }
                </div>
                <div className="justify-around items-start flex h-full flex-col">
                    {
                        fields.slice(6, 9).map((field, index) => (
                            <Fields key={index} label={field.label} value={field.value} />
                        ))
                    }
                </div>
            </div>
            <div className="w-full items-end justify-end flex">
                <button className="bg-[#4E7396] px-5 py-2 mb-5 w-24 text-center flex items-center justify-center rounded-md" onClick={handleConfirm}>
                    {
                        loading ? <LoadingSpinner /> : "Confirm"
                    }
                </button>
            </div>
        </div>
    )
}