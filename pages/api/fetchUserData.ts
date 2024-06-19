import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

const fetchUserData = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const response = await axios.get(`https://minor-nitc-server.onrender.com/students/student/${req.query.id}`);
        const data = response.data;
        console.log(data);
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchUserData;