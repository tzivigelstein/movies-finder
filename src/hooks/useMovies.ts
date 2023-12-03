import { useState, useEffect, useCallback } from "react";
import { Movie, Type } from "../types/movie";
import { parseMovies } from "../parsers/movie";
import MoviesClient from "../client/movies";
import debounce from "just-debounce-it";
import { useNavigate } from "react-router-dom";

interface UseMoviesProps {
  query: string;
  type: Type | null;
}

interface QueryAndType {
  query: string;
  type: Type | null;
}

export default function useMovies({ query, type }: UseMoviesProps) {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const client = new MoviesClient();

  useEffect(() => {
    const params = { query, type };

    if (!hasSearched) {
      refreshCb(params);
      setHasSearched(true);
    } else {
      refreshMoviesWithDebounce(params);
    }
  }, [query, type]);

  const refreshCb = useCallback(async ({ query: q, type: t }: QueryAndType) => {
    setLoading(true);
    setError(null);

    await client
      .getMovies({ query: q, type: t })
      .then((data) => data.Search)
      .then(parseMovies)
      .then(setMovies)
      .catch(setError)
      .finally(() => {
        setLoading(false);

        const typeQueryParam =
          t !== null ? `&type=${encodeURIComponent(t)}` : "";

        navigate(`?q=${encodeURIComponent(q)}${typeQueryParam}`);
      });
  }, []);

  const refreshMoviesWithDebounce = useCallback(
    debounce((params: QueryAndType) => refreshCb(params), 500),
    [refreshCb],
  );

  return { movies, moviesError: error, loading };
}
