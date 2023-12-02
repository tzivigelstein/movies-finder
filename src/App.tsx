import "./App.css"
import useMovies from "./hooks/useMovies"

function App() {
  const {movies} = useMovies()

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
      <main>{movies && movies.map(movie => <p>{movie.title}</p>)}</main>
    </div>
  )
}

export default App
