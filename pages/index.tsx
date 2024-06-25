import Navbar from "@/components/Navbar";
import SignIn from "@/components/SignIn";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const [authData, setAuthData] = useState<any>({
    email: "",
    name: "",
    photo: "",
  });

  const router = useRouter();

  console.log(authData);


  const postUserAuthData = async () => {
    try {
      const response = await fetch("/api/postUserAuthData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // React.useEffect(() => {
  //   if(authData.email !== ""){
  //     postUserAuthData();
  //   }
  // }, [authData]);
  
  React.useEffect(() => {
    if(authData.email !== ""){
      // postUserAuthData();
      router.push("/courses");
    }
  }, [authData]);



  return (
    <div className={`bg-[#1A202C] text-center items-center flex flex-col min-h-screen justify-center text-white`}>
      <div className="bg-[#2E3748] w-11/12 shadow-2xl rounded-xl md:1/3 lg:w-1/3 xl:1/3 2xl:1/3 h-64 flex items-center justify-center flex-col gap-4">
        <div className="h-10 w-10 bg-black rounded-full" />
        <p>NITC MINOR ALLOCATION PORTAL</p>
        <SignIn
          setAuthData={setAuthData}
        />
      </div>
    </div>
  );
}
