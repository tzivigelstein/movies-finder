import './Movies.css'
import { useLocation } from 'react-router-dom'

import HorizontalPicker from './components/HorizontalPicker'

import { Type } from './types/movie'
import useMovies from './hooks/useMovies'
import useQuery from './hooks/useQuery'
import useIntersectionObserver, {
  IntersectionObserverOptions,
} from './hooks/useIntersectionObserver'

import MoviesGallerySkeleton from './components/MoviesGallery/Skeleton'
import MoviesGallery from './components/MoviesGallery'
import SearchMessage from './components/SearchMessage'
import Input from './components/Input'
import JustRemovedQueryMessage from './components/JustRemovedQueryMessage'

export default function Movies() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const options: IntersectionObserverOptions = {
    root: null,
    rootMargin: '-100px',
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
          <Input
            handleQueryChange={handleQueryChange}
            loading={loading}
            loadingExtra={loadingExtra}
            query={query}
            removeQueryFromInput={removeQueryFromInput}
            setNewQuery={setNewQuery}
          />
          <SearchMessage
            justRemovedQuery={justRemovedQuery}
            loading={loading}
            moviesError={moviesError}
            query={query}
            queryError={queryError}
            type={type}
          />
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
          <JustRemovedQueryMessage setNewQuery={setNewQuery} />
        )}
        {!justRemovedQuery && loading && <MoviesGallerySkeleton />}
      </main>
    </div>
  )
}
