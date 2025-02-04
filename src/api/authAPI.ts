import axiosInstance from "@/utils/axios";
import { loginValidation, registerValidation } from "@/utils/zod-validation";
import { z } from "zod";

type RegisterReturn = {
  success: boolean,
  message: string,
  user: {
    id: number,
    username: string,
    email: string
  }
}

export const registerUser = async (userData: z.infer<typeof registerValidation>) => {
  const { confirm, ...data } = userData;
  
  const {data:user} = await axiosInstance.post('/Account/register', { ...data });
  
  return user as RegisterReturn;
};

export const loginUser = async (userData: z.infer<typeof loginValidation>) => {
  const response = await axiosInstance.post(`/Account/login`, { ...userData, rememberMe: false });
  console.log("login", response.data.token)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};