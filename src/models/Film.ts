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
  cast?: string;
  rating: number;
  trailerUrl?: string;
  imageUrl?: string;
}
