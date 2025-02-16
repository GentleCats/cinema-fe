export interface Ticket {
  id: number;
  row: number;
  col: number;
  seat: number;
  sessionId: number;
  bookingTime: Date;
}
