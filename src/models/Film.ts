import { Actor } from './Actor';
import { Session } from './Session';

export interface Film {
  id: number;
  tmdbId?: number;
  title: string;
  description: string;
  duration: string;
  country?: string;
  genre: string;
  releaseDate?: Date;
  endDate?: Date;
  director?: string;
  cast: Actor[];
  rating: number;
  trailerUrl?: string;
  imageUrl?: string;
}

export interface FilmWithSessions extends Film {
  sessions: Session[];
}
