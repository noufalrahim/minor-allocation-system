import React from "react";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from "../../config/firebase/config";
import { FaGoogle } from "react-icons/fa";

interface SignInProps {
    setAuthData: any;
}

export default function SignIn({setAuthData}: SignInProps){


    const handleClick = () => {
        signInWithPopup(auth, provider).then((result) => {
            setAuthData({
                email: result.user.email,
                name: result.user.displayName,
                photo: result.user.photoURL
            });
        }).catch((error) => {
            console.log(error);
        });
    }  

    return(
        <div className="bg-white text-black px-2 py-1 my-1 rounded-md items-center justify-around flex flex-row gap-2">
            <FaGoogle className="inline-block" color="red"/>
            <button onClick={handleClick}>Sign in with Google</button>
        </div>
    )
}