import styles from "./index.module.css";

import { Movie } from "../../types/movie";
import MovieItem from "../MovieItem";
import MovieItemSkeleton from "../MovieItem/Skeleton";
import { ForwardedRef, forwardRef } from "react";

interface Props {
  movies: Movie[] | null;
  loadingExtra: boolean;
  totalResults: number;
}

const MoviesGallery = forwardRef(
  (
    { movies, loadingExtra, totalResults }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    let skeletonsCount = 10;

    if (movies) {
      const difference = totalResults - movies.length;
      skeletonsCount = difference < 10 ? difference : 10;
    }

    return (
      <ul className={styles.list}>
        {movies &&
          movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        {loadingExtra &&
          Array.from({ length: skeletonsCount }, (_, index) => (
            <MovieItemSkeleton key={`skeleton-${index}`} />
          ))}
        <div id="observer" ref={ref}></div>
      </ul>
    );
  },
);

export default MoviesGallery;
