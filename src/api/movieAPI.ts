import { Film } from '@/models/Film';
import { z } from 'zod';

import axiosInstance from '@/utils/axios';
import { filmValidation } from '@/utils/zod-validation';

export const createMovie = async (film: z.infer<typeof filmValidation>, id: number): Promise<void> => {
  await axiosInstance.post('/Admin/create-movie', { ...film, tmdbId: id });
};

export const deleteMovie = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Admin/delete-movie-by-id/${id}`);
};

export const updateMovie = async (id: number, filmUpdate: Partial<z.infer<typeof filmValidation>>): Promise<void> => {
  await axiosInstance.put(`/Movie/update/${id}`, { ...filmUpdate });
};

export const geMovie = async (id: number): Promise<Film> => {
  const { data: movie } = await axiosInstance.get(`/Movie/get-by-id/${id}`);
  return movie;
};
