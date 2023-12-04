import styles from './index.module.css'

import { Movie } from '../../types/movie'

import placeholderImage from '/movie-placeholder.png'

interface Props {
  movie: Movie
}

export default function MovieItem({ movie }: Props) {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImage
  }

  return (
    <a
      href={`${import.meta.env.VITE_IMDB_URL}/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <li className={styles.container}>
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          onError={handleImageError}
        />
        <div className={styles.infoContainer}>
          <span className={styles.title}>{movie.title}</span>
          <span className={styles.year}>
            {movie.year} · <span className={styles.type}>{movie.type}</span>
          </span>
          <span className={styles.imdbLink}>
            Check on IMDB
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
        </div>
      </li>
    </a>
  )
}
