import { APIMovie, Movie } from "../types/movie";

export const parseMovie = (movie: APIMovie): Movie => ({
  ...movie,
  id: movie.imdbID,
  poster: movie.Poster,
  title: movie.Title,
  type: movie.Type,
  year: parseInt(movie.Year),
});

export const parseMovies = (movies: APIMovie[]): Movie[] => {
  return movies.map(parseMovie);
};
