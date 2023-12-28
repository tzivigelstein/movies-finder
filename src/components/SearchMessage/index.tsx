import styles from './index.module.css'

interface Props {
  queryError: string | null
  moviesError: string | null
  loading: boolean
  query: string
  type: string | null
  justRemovedQuery: boolean
}

export default function SearchMessage({
  queryError,
  moviesError,
  loading,
  query,
  type,
  justRemovedQuery,
}: Props) {
  const noErrorsNotLoadingAndQuery =
    !queryError && !moviesError && !loading && query

  const notLoadingMovieErrorAndJustRemoved =
    !loading && !justRemovedQuery && moviesError

  const typeExistsAndItsGreaterThanZero = type && type?.length > 0

  const typeMessageSegment = typeExistsAndItsGreaterThanZero ? type : 'movie'
  return (
    <span className={styles.message}>
      {noErrorsNotLoadingAndQuery && `Search "${query}"`}
      {notLoadingMovieErrorAndJustRemoved &&
        `We couldn't find your ${typeMessageSegment}`}
    </span>
  )
}
