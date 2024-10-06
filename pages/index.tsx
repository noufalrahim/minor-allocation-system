import Navbar from "@/components/Navbar";
import SignIn from "@/components/SignIn";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserId } from "../state";
import Image from "next/image";

export default function Home() {
  const [authData, setAuthData] = useState<any>({
    email: "",
    name: "",
    photo: "",
  });

  const router = useRouter();


  const dispatch = useDispatch();

  React.useEffect(() => {
    const verifyDetails = async () => {
      if (authData.email !== "") {
        const response = await fetch("/api/postUserAuthData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authData),
        });
        const data = await response.json();
        if (response.status === 404) {
          alert("User not found");
          return;
        }

        if (response.status !== 200) {
          alert("Some error occured");
          return;
        }

        if(!data.success){
          alert("User not found");
          return;
        }

        dispatch(setUserId({ userId: data.studentId }));
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("userId", data.studentId);
        router.push("/courses");
      }
    };

    verifyDetails();
  }, [authData]);

  React.useEffect(() => {
    const isUserLoggedIn = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        router.push("/courses");
      }
    };

    isUserLoggedIn();
  }, []);

  return (
    <div
      className={`bg-[#1A202C] text-center items-center flex flex-col min-h-screen justify-center text-white`}
    >
      <div className="bg-[#2E3748] w-11/12 shadow-2xl rounded-xl md:1/3 lg:w-1/3 xl:1/3 2xl:1/3 h-64 flex items-center justify-center flex-col gap-4">
        <div className="bg-white w-16 h-16 rounded-full justify-center items-center flex">
          <Image src="/LogoBW.png" width={50} height={50} className="p-2" alt=""/>
        </div>
        <p>NITC MINOR ALLOCATION PORTAL</p>
        <SignIn setAuthData={setAuthData} />
      </div>
    </div>
  );
}
