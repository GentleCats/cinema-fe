import { Ticket } from './Ticket';

export interface Hall {
  id: number;
  name: string;
  capacity: number;
  ticket: Ticket;
}
