import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST!;
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY!;

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST,
};

export const searchJobs = async (query: string) => {
  const res = await axios.get(
    `https://${API_HOST}/search?query=${encodeURIComponent(query)}&page=1&num_pages=1`,
    { headers }
  );
  return res.data;
};

export const getJobDetails = async (id: string) => {
  const res = await axios.get(
    `https://${API_HOST}/job-details?job_id=${id}`,
    { headers }
  );
  return res.data;
};

// server backend

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const registerUser = (email: string, password: string) => {
  return axiosInstance.post('/register', { email, password });
};

export const loginUser = (email: string, password: string) => {
  return axiosInstance.post('/login', { email, password });
};

