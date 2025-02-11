import { Ticket } from '@/models/Ticket';

import axiosInstance from '@/utils/axios';

export const getTicketsBySessionId = async (id: number): Promise<Ticket[]> => {
  const { data } = await axiosInstance.get(`/Ticket/get-by-sessionId/${id}`);
  return data;
};
