import { useState, useEffect } from "react";
import { Movie, Type } from "../types/movie";
import { parseMovies } from "../parsers/movie";
import MoviesClient from "../client/movies";

interface UseMoviesProps {
  query: string;
  type: Type | null;
}

export default function useMovies({ query, type }: UseMoviesProps) {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const client = new MoviesClient();

  useEffect(() => {
    setLoading(true);
    setError(null);

    client
      .getMovies({ query, type })
      .then((data) => data.Search)
      .then(parseMovies)
      .then(setMovies)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [query, type]);

  return { movies, moviesError: error, loading };
}
