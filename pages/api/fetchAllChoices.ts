import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchAllChoices = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.query.id);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/students/student/${req.query.id}/choices`);
        const data = response.data;
        console.log(data);
        res.status(200).json(data);
    } catch (error) {  
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchAllChoices;