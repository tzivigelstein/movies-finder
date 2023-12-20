import './Movies.css'
import { useLocation } from 'react-router-dom'

import HorizontalPicker from './components/HorizontalPicker'

import { Type } from './types/movie'
import useMovies from './hooks/useMovies'
import useQuery from './hooks/useQuery'
import useExampleMovie from './hooks/useExampleMovie'
import useIntersectionObserver, {
  IntersectionObserverOptions,
} from './hooks/useIntersectionObserver'

import MoviesGallerySkeleton from './components/MoviesGallery/Skeleton'
import MoviesGallery from './components/MoviesGallery'
import { TimesIcon } from './components/Icons'

export default function Movies() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const options: IntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }

  const { target, hasIntersected } = useIntersectionObserver({ options })

  const queryFromQueryParams = queryParams.get('q')
  const typeFromQueryParams = queryParams.get('type') as Type | null

  const {
    query,
    type,
    queryError,
    justRemovedQuery,
    handleQueryChange,
    handleTypeChange,
    clearQuery,
    setNewQuery,
  } = useQuery({
    initialQuery: queryFromQueryParams,
    initialType: typeFromQueryParams,
  })
  const { movies, totalResults, moviesError, loading, loadingExtra } =
    useMovies({
      query,
      type,
      intersected: hasIntersected,
    })

  const { exampleMovie } = useExampleMovie()

  function removeQueryFromInput() {
    clearQuery()
  }

  return (
    <div className="page">
      <header>
        <img src="/icon.png" alt="Movie celluloid reel" />
        <h1>Find the movie you are looking for</h1>
      </header>
      <header>
        <div className="searchContainer">
          <div className="inputContainer">
            <input
              value={query}
              name="query"
              type="text"
              placeholder="Search movies"
              onChange={handleQueryChange}
              onClick={event => event.currentTarget.setSelectionRange(-1, -1)}
            />
            {!!query && (
              <button
                onClick={removeQueryFromInput}
                className="removeQueryButton"
              >
                <TimesIcon />
              </button>
            )}
          </div>
          <span className="message">
            {!queryError &&
              !moviesError &&
              !loading &&
              query &&
              `Search "${query}"`}
            {!loading &&
              moviesError &&
              `We couldn't find your ${
                type && type?.length > 0 ? type : 'movie'
              }`}
          </span>
          <HorizontalPicker type={type} handleTypeChange={handleTypeChange} />
        </div>
      </header>
      <main>
        {!justRemovedQuery && !moviesError && !loading && (
          <MoviesGallery
            movies={movies}
            loadingExtra={loadingExtra}
            totalResults={totalResults}
            ref={target}
          />
        )}
        {justRemovedQuery && (
          <button
            onClick={() => setNewQuery(exampleMovie)}
            className="examplesButton"
          >
            <p className="examplesHelper">
              Try searching for <span>{exampleMovie}</span>
            </p>
          </button>
        )}
        {!justRemovedQuery && loading && <MoviesGallerySkeleton />}
      </main>
    </div>
  )
}
