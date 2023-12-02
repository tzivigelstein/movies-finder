import styles from "./index.module.css";

import { Movie } from "../../types/movie";
import MovieItem from "../MovieItem";

interface Props {
  movies: Movie[] | null;
}

export default function MoviesGallery({ movies }: Props) {
  return (
    <ul className={styles.list}>
      {movies &&
        movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />)}
    </ul>
  );
}
