import { Film } from './Film';
import { Hall } from './Hall';

export interface Session {
  id: number;
  startTime: string;
  endTime: string;
  dateTime: Date;
  hall: Hall;
  film: Film;
}
