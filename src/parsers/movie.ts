import {APIMovie, Movie} from "../types/movie"

export const parseMovie = (movie: APIMovie): Movie => ({
  ...movie,
  poster: movie.Poster,
  title: movie.Title,
  type: movie.Type,
  year: parseInt(movie.Year)
})
