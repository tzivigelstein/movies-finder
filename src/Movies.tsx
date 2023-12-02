import "./Movies.css";
import HorizontalPicker from "./components/HorizontalPicker";

import MoviesGallery from "./components/MoviesGallery";
import MoviesGallerySkeleton from "./components/MoviesGallery/Skeleton";
import useMovies from "./hooks/useMovies";
import useQuery from "./hooks/useQuery";
import { useLocation } from "react-router-dom";
import { Type } from "./types/movie";

export default function Movies() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromQueryParams = queryParams.get("q");
  const typeFromQueryParams = queryParams.get("type") as Type | null;

  const { query, type, queryError, handleQueryChange, handleTypeChange } =
    useQuery({
      initialQuery: queryFromQueryParams,
      initialType: typeFromQueryParams,
    });
  const { movies, moviesError, loading } = useMovies({ query, type });

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
          <HorizontalPicker type={type} handleTypeChange={handleTypeChange} />
        </div>
      </header>
      <main>
        {!moviesError && !loading && <MoviesGallery movies={movies} />}
        {loading && <MoviesGallerySkeleton />}
      </main>
    </div>
  );
}
