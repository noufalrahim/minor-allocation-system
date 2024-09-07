import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/AppConstants";

const postUserAuthData = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, req.body);
    console.log(response.data);
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 404) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export default postUserAuthData;
