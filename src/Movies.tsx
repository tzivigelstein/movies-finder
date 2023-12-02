import "./Movies.css";

import MoviesGallery from "./components/MoviesGallery";
import useMovies from "./hooks/useMovies";
import useQuery from "./hooks/useQuery";
import { useLocation } from "react-router-dom";

export default function Movies() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromQueryParams = queryParams.get("q");

  const { query, queryError, handleQueryChange } = useQuery({
    initialQuery: queryFromQueryParams,
  });
  const { movies, moviesError, loading } = useMovies({ query });

  return (
    <div className="page">
      <h1>Find the movie you are looking for</h1>
      <header>
        <div className="searchContainer">
          <input
            value={query}
            name="query"
            type="text"
            placeholder="Search movies"
            onChange={handleQueryChange}
          />
          <span className="message">
            {!queryError &&
              !moviesError &&
              !loading &&
              query &&
              `Search "${query}"`}
            {moviesError && "We couldn't find your movie"}
          </span>
        </div>
      </header>
      <main>
        <MoviesGallery movies={movies} />
      </main>
    </div>
  );
}
