import { z } from 'zod';

import axiosInstance from '@/utils/axios';
import { filmValidation } from '@/utils/zod-validation';

export const createMovie = async (film: z.infer<typeof filmValidation>): Promise<void> => {
  await axiosInstance.post('/Admin/create-movie', { ...film });
};

export const deleteMovie = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Admin/delete-movie-by-id/${id}`);
};
