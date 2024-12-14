import styles from "./favorites.module.css";
import { usemovieContext } from "../contexts/movieContext.jsx";

export default function Favorites() {
  const { favorites } = usemovieContext();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={styles.resultsContainer}>
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <div key={movie.id} className={styles.resultCard}>
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            ) : (
              <div className={styles.noPoster}>No Poster Available</div>
            )}
            <div className={styles.resultDetails}>
              <h1>{movie.title}</h1>
              <p>{movie.release_date?.split("-")[0]}</p>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.heart}>
        <h3 className={styles.header}>No Favorites Yet.</h3>
        <p>Click on the 🤍 to add to Favorites.</p>
        </div>
      )}
    </div>
  );
}
