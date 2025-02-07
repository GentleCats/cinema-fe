import { Session } from './Session';
import { Ticket } from './Ticket';
import { User } from './User';

export interface Booking {
  id: number;
  bookingTime: Date;
  user: User;
  session: Session;
  ticket: Ticket;
}
