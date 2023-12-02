import MovieItemSkeleton from "../../MovieItem/Skeleton";
import galleryStyles from "../index.module.css";

export default function MoviesGallerySkeleton() {
  return (
    <ul className={galleryStyles.list}>
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
    </ul>
  );
}
