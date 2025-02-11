import { Film } from './Film';
import { Hall } from './Hall';

export interface Session {
  id: number;
  startTime: string;
  endTime: string;
  date: Date;
  hall: Hall;
  film: Film;
  hallId: number;
}
