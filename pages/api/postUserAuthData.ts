import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BASE_URL } from "@/AppConstants";

const postUserAuthData = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    try{
        const response = await axios.post(`${BASE_URL}/auth/login`, req.body);
        console.log(response.data);
        const data = response.data;
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
}

export default postUserAuthData;