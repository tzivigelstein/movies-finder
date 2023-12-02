import { useState, useEffect } from "react";
import data from "../mocks/barbie.json";
import { APIMoviesResponse, Movie } from "../types/movie";
import { parseMovie } from "../parsers/movie";

interface UseMoviesProps {
  query: string;
}

export default function useMovies({ query }: UseMoviesProps) {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rawMovies: APIMoviesResponse = data;

    const parsedMovies = rawMovies.Search.map(parseMovie);

    setMovies(parsedMovies);
  }, []);

  return { movies, moviesError: error, loading };
}
