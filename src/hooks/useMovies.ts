import { useState, useEffect, useCallback } from 'react'
import { Movie, Type } from '../types/movie'
import { parseMovies } from '../parsers/movie'
import MoviesClient from '../client/movies'
import debounce from 'just-debounce-it'
import { useNavigate } from 'react-router-dom'

interface UseMoviesProps {
  query: string
  type: Type | null
  intersected: boolean
}

interface QueryAndType {
  query: string
  type: Type | null
}

interface QueryTypeAndPage extends QueryAndType {
  page: number
}

const FIRST_PAGE = 1

export default function useMovies({
  query,
  type,
  intersected,
}: UseMoviesProps) {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingExtra, setLoadingExtra] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const [page, setPage] = useState(FIRST_PAGE)
  const [hasMore, setHasMore] = useState(true)
  const [totalResults, setTotalResults] = useState(0)

  const navigate = useNavigate()

  const client = new MoviesClient()

  useEffect(() => {
    setPage(FIRST_PAGE)

    const params = { query, type }

    if (!hasSearched) {
      refreshCb(params)
      setHasSearched(true)
    } else {
      refreshMoviesWithDebounce(params)
    }
  }, [query, type])

  useEffect(() => {
    const params = { query, type, page: page + 1 }

    if (intersected && hasMore) {
      setPage(prev => prev + 1)
      refreshWithPageCb(params)
    }
  }, [intersected])

  useEffect(() => {
    if (movies?.length === totalResults) {
      setHasMore(false)
    }
  }, [movies])

  const refreshCb = useCallback(async ({ query: q, type: t }: QueryAndType) => {
    setLoading(true)
    setError(null)

    await client
      .getMovies({ query: q, type: t })

      .then(data => {
        setTotalResults(parseInt(data.totalResults))
        return data.Search
      })

      .then(parseMovies)

      .then(setMovies)
      .catch(setError)
      .finally(() => {
        setLoading(false)

        const typeQueryParam =
          t !== null ? `&type=${encodeURIComponent(t)}` : ''

        navigate(`?q=${encodeURIComponent(q)}${typeQueryParam}`)
      })
  }, [])

  const refreshWithPageCb = useCallback(
    async ({ query: q, type: t, page: p }: QueryTypeAndPage) => {
      setLoadingExtra(true)
      setError(null)

      await client
        .getPaginatedMovies({ query: q, type: t, page: p })
        .then(data => data.Search)
        .then(parseMovies)
        .then(movies => {
          setMovies(prev => {
            if (prev) {
              return [...prev, ...movies]
            }

            return movies
          })
        })
        .catch(setError)
        .finally(() => {
          setLoadingExtra(false)

          const typeQueryParam =
            t !== null ? `&type=${encodeURIComponent(t)}` : ''

          navigate(`?q=${encodeURIComponent(q)}${typeQueryParam}`)
        })
    },
    [],
  )

  const refreshMoviesWithDebounce = useCallback(
    debounce((params: QueryAndType) => refreshCb(params), 500),
    [refreshCb],
  )

  return { movies, moviesError: error, loading, loadingExtra, totalResults }
}
