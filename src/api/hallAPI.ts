import { Hall } from "@/models/Hall";
import axiosInstance from "@/utils/axios"
import { hallValidation } from "@/utils/zod-validation";
import { z } from "zod";

export const getHalls = async (): Promise<Hall[]> => {
  const { data } = await axiosInstance.get(`/Hall/get-all`);
  return data;
}

export const getHall = async (id: number): Promise<Hall> => {
  const { data } = await axiosInstance.get(`/Hall/get-by-id/${id}`);
  return data;
}

export const deleteHall = async (id:number): Promise<void> => {
  await axiosInstance.delete(`/Hall/delete/${id}`);
}

export const createHall = async (hall: z.infer<typeof hallValidation>):Promise<void> => {
  await axiosInstance.post('/Hall/create',{...hall});
}