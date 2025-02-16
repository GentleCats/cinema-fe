import { Film } from './Film';
import { Hall } from './Hall';
import { Ticket } from './Ticket';

export interface Session {
  id: number;
  startTime: string;
  endTime: string;
  date: Date;
  hall: Hall;
  film: Film;
  hallId: number;
  price: number;
  tickets: Ticket[];
  movie: Film;
}
