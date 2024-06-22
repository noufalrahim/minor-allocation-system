import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import Fields from "./Fields";
import React from "react";
import { loggedInUser } from "@/AppConstants";

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

    const [isLoading, setIsLoading] = React.useState(true);

    const [fields, setFields] = React.useState([
        { label: "Name", value: "" },
        { label: "Roll No", value: "" },
        { label: "Faculty Advisor", value: "" },
        { label: "Email", value: "" },
        { label: "Department", value: "" },
        { label: "Semester", value: "" },
        { label: "Overall CGPA", value: "" },
        { label: "SGPA 1", value: "" },
        { label: "SGPA 2", value: "" },
    ])

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/fetchUserData?id=${loggedInUser}`);
            const data = response.data;
            console.log(data);
            // setStudentData(data);
            setFields([
                { label: "Name", value: data.name },
                { label: "Roll No", value: data.regNo },
                { label: "Faculty Advisor", value: data.faName },
                { label: "Email", value: data.email },
                { label: "Department", value: data.programName },
                { label: "Semester", value: data.semester },
                { label: "Overall CGPA", value: data.cgpa },
                { label: "SGPA 1", value: data.sgpaS1 },
                { label: "SGPA 2", value: data.sgpaS2 },
            ])
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }

    }

    React.useEffect(() => {


        fetchUserData();

    }, [])

    return (
        <div className="dark:bg-[#1F2937] bg-[#D4DDFF] h-full lg:h-80 xl:h-80 2xl:h-80 3xl:h-80 px-20 flex flex-col rounded-lg text-white shadow-lg w-11/12 lg:w-[60rem] xl:w-[60rem] 2xl:w-[60rem] 3xl:w-[60rem]">
            {
                isLoading ?
                <div className="flex flex-col items-center justify-center h-full">
                    <LoadingSpinner />
                </div> : (
                    <>
                        <div className="flex justify-between items-start h-full mt-5 flex-col lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row">
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
                        <div className="w-full items-center justify-center mt-5 flex">
                            <button className="bg-[#4E7396] px-5 py-2 mb-5 w-24 text-center flex items-center justify-center rounded-md" onClick={handleConfirm}>
                                {
                                    loading ? <LoadingSpinner /> : "Confirm"
                                }
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    )
}