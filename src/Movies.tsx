import "./Movies.css";
import HorizontalPicker from "./components/HorizontalPicker";

import MoviesGallery from "./components/MoviesGallery";
import MoviesGallerySkeleton from "./components/MoviesGallery/Skeleton";
import useMovies from "./hooks/useMovies";
import useQuery from "./hooks/useQuery";
import { useLocation } from "react-router-dom";
import { Type } from "./types/movie";
import useIntersectionObserver, {
  IntersectionObserverOptions,
} from "./hooks/useIntersectionObserver";

export default function Movies() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const options: IntersectionObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const { target, hasIntersected } = useIntersectionObserver({ options });

  const queryFromQueryParams = queryParams.get("q");
  const typeFromQueryParams = queryParams.get("type") as Type | null;

  const { query, type, queryError, handleQueryChange, handleTypeChange } =
    useQuery({
      initialQuery: queryFromQueryParams,
      initialType: typeFromQueryParams,
    });
  const { movies, totalResults, moviesError, loading, loadingExtra } =
    useMovies({
      query,
      type,
      intersected: hasIntersected,
    });

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
            onClick={(event) => event.currentTarget.setSelectionRange(-1, -1)}
          />
          <span className="message">
            {!queryError &&
              !moviesError &&
              !loading &&
              query &&
              `Search "${query}"`}
            {moviesError &&
              `We couldn't find your ${
                type && type?.length > 0 ? type : "movie"
              }`}
          </span>
          <HorizontalPicker type={type} handleTypeChange={handleTypeChange} />
        </div>
      </header>
      <main>
        {!moviesError && !loading && (
          <MoviesGallery
            movies={movies}
            loadingExtra={loadingExtra}
            totalResults={totalResults}
            ref={target}
          />
        )}
        {loading && <MoviesGallerySkeleton />}
      </main>
    </div>
  );
}
