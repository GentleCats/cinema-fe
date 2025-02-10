import { Session } from '@/models/Session';
import { z } from 'zod';

import axiosInstance from '@/utils/axios';
import { sessionValidation } from '@/utils/zod-validation';

export const getSessions = async (id: number): Promise<Session[]> => {
  const { data } = await axiosInstance.get(`/Session/get-by-film-id/${id}`);
  return data;
};
export const deleteSession = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Session/${id}`);
};
export const createSession = async (session: z.infer<typeof sessionValidation>) => {
  console.log(session);

  await axiosInstance.post(`/Session`, { ...session });
};
