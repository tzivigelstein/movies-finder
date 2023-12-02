import styles from "./index.module.css";

import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}

export default function MovieItem({ movie }: Props) {
  return (
    <a
      href={`${import.meta.env.VITE_IMDB_URL}/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <li className={styles.container}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className={styles.infoContainer}>
          <span className={styles.title}>{movie.title}</span>
          <span className={styles.year}>
            {movie.year} · <span className={styles.type}>{movie.type}</span>
          </span>
        </div>
      </li>
    </a>
  );
}
