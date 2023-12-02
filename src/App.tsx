import "./App.css";

import MoviesGallery from "./components/MoviesGallery";
import useMovies from "./hooks/useMovies";

export default function App() {
  const { movies } = useMovies();

  return (
    <div className="page">
      <h1>Find the movie you are looking for</h1>
      <header>
        <form>
          <div className="searchContainer">
            <input type="text" placeholder="Barbie, Avengers, The Matrix..." />
            <button>Search</button>
          </div>
        </form>
      </header>
      <main>
        <MoviesGallery movies={movies} />
      </main>
    </div>
  );
}
