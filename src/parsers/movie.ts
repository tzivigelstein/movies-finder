import { APIMovie, Movie } from "../types/movie";

export const parseMovie = ({
  imdbID,
  Poster,
  Title,
  Type,
  Year,
  ...rest
}: APIMovie): Movie => ({
  ...rest,
  id: imdbID,
  poster: Poster,
  title: Title,
  type: Type,
  year: parseInt(Year),
});

export const parseMovies = (movies: APIMovie[]): Movie[] => {
  return movies.map(parseMovie);
};
