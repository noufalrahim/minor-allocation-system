import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchCoursesData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/minors`);
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {  
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchCoursesData;