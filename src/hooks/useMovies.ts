import { useState, useEffect } from "react";
import data from "../mocks/barbie.json";
import { APIMoviesResponse, Movie } from "../types/movie";
import { parseMovie } from "../parsers/movie";

export default function useMovies() {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    const rawMovies: APIMoviesResponse = data;

    const parsedMovies = rawMovies.Search.map(parseMovie);

    setMovies(parsedMovies);
  }, []);

  return { movies };
}
