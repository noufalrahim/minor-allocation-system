import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

const fetchUserData = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/students/student/${req.query.id}`,{
            headers: {
                authorization: req.headers.authorization
        }});
        const data = response.data;
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchUserData;