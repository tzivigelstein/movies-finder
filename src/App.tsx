import "./App.css";

import MoviesGallery from "./components/MoviesGallery";
import useMovies from "./hooks/useMovies";
import useQuery from "./hooks/useQuery";

export default function App() {
  const { query, queryError, handleQueryChange } = useQuery();
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
          </span>
        </div>
      </header>
      <main>
        <MoviesGallery movies={movies} />
      </main>
    </div>
  );
}
