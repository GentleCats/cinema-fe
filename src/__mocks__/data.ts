import { Booking } from "@/models/Booking";
import { Film } from "@/models/Film";
import { Hall } from "@/models/Hall";
import { Session } from "@/models/Session";
import { Ticket } from "@/models/Ticket";
import { User } from "@/models/User";

// Mock Data for Films
export const films: Film[] = [
  { id: 1, title: "Inception", description: "A mind-bending thriller", duration: "2:28", genre: "Sci-Fi", releaseDate: new Date("2010-07-16"), rating: 8.8 },
  { id: 2, title: "Titanic", description: "A timeless romance", duration: "3:15", genre: "Romance", releaseDate: new Date("1997-12-19"), rating: 7.9 },
  { id: 3, title: "The Dark Knight", description: "Gotham's savior rises", duration: "2:32", genre: "Action", releaseDate: new Date("2008-07-18"), rating: 9.0 },
  { id: 4, title: "Avatar", description: "A visually stunning epic", duration: "2:42", genre: "Sci-Fi", releaseDate: new Date("2009-12-18"), rating: 7.8 },
  { id: 5, title: "The Godfather", description: "An iconic crime saga", duration: "2:55", genre: "Crime", releaseDate: new Date("1972-03-24"), rating: 9.2 },
  { id: 6, title: "The Shawshank Redemption", description: "A story of hope", duration: "2:22", genre: "Drama", releaseDate: new Date("1994-09-22"), rating: 9.3 },
  { id: 7, title: "Interstellar", description: "A journey through space and time", duration: "2:49", genre: "Sci-Fi", releaseDate: new Date("2014-11-07"), rating: 8.6 },
  { id: 8, title: "The Matrix", description: "A sci-fi revolution", duration: "2:16", genre: "Sci-Fi", releaseDate: new Date("1999-03-31"), rating: 8.7 },
  { id: 9, title: "Parasite", description: "A social satire masterpiece", duration: "2:12", genre: "Thriller", releaseDate: new Date("2019-05-30"), rating: 8.5 },
  { id: 10, title: "Gladiator", description: "A tale of revenge and honor", duration: "2:35", genre: "Action", releaseDate: new Date("2000-05-05"), rating: 8.5 },
];

// Mock Data for Halls
export const halls: Hall[] = [
  { id: 1, name: "Hall A", capacity: 200, ticket: { id: 1, price: 15 } },
  { id: 2, name: "Hall B", capacity: 150, ticket: { id: 2, price: 12 } },
  { id: 3, name: "Hall C", capacity: 100, ticket: { id: 3, price: 10 } },
  { id: 4, name: "VIP Hall", capacity: 50, ticket: { id: 4, price: 25 } },
  { id: 5, name: "Hall D", capacity: 250, ticket: { id: 5, price: 18 } },
  { id: 6, name: "Hall E", capacity: 300, ticket: { id: 6, price: 20 } },
  { id: 7, name: "Hall F", capacity: 100, ticket: { id: 7, price: 10 } },
  { id: 8, name: "IMAX", capacity: 350, ticket: { id: 8, price: 30 } },
  { id: 9, name: "Hall G", capacity: 180, ticket: { id: 9, price: 16 } },
  { id: 10, name: "Hall H", capacity: 120, ticket: { id: 10, price: 14 } },
];

// Mock Data for Users
export const users: User[] = [
  { id: 1, username: "john_doe", email: "john@example.com", isAdmin: false },
  { id: 2, username: "jane_doe", email: "jane@example.com", isAdmin: true },
  { id: 3, username: "sam_smith", email: "sam@example.com", isAdmin: false },
  { id: 4, username: "admin_user", email: "admin@example.com", isAdmin: true },
  { id: 5, username: "alice_wonder", email: "alice@example.com", isAdmin: false },
  { id: 6, username: "bob_builder", email: "bob@example.com", isAdmin: false },
  { id: 7, username: "carol_davis", email: "carol@example.com", isAdmin: false },
  { id: 8, username: "david_tennant", email: "david@example.com", isAdmin: false },
  { id: 9, username: "ellen_ripley", email: "ellen@example.com", isAdmin: false },
  { id: 10, username: "frank_castle", email: "frank@example.com", isAdmin: true },
];

// Mock Data for Sessions
export const sessions: Session[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  startTime: "18:00",
  endTime: "20:30",
  dateTime: new Date(`2025-02-${i + 1}T18:00:00`),
  hall: halls[i % halls.length]!,
  film: films[i % films.length]!,
}));

// Mock Data for Bookings
export const bookings: Booking[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  bookingTime: new Date(),
  user: users[i % users.length]!,
  session: sessions[i % sessions.length]!,
  ticket: { id: i + 1, price: 15 + i } as Ticket,
}));

// Mock Data for Tickets
export const tickets: Ticket[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  price: 10 + i * 2, // Price increments for variety
}));
