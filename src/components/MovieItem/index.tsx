import styles from "./index.module.css";

import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}

export default function MovieItem({ movie }: Props) {
  return (
    <li className={styles.container}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <span className={styles.title}>{movie.title}</span>
    </li>
  );
}
