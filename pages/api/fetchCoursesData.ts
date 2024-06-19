import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchCoursesData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get("https://minor-nitc-server.onrender.com/minors");
        const data = response.data;
        console.log(data);
        res.status(200).json(data);
    } catch (error) {  
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchCoursesData;