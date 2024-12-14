import styles from "./movieList.module.css";
import { usemovieContext } from "../contexts/movieContext.jsx";

export default function MovieList({ results, movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = usemovieContext();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={styles.resultsContainer}>
      {results.length > 0 ? (
        results.map((result) =>
          result.title.toLowerCase().startsWith(movie?.toLowerCase() || "") && (
            <div key={result.id} className={styles.resultCard}>
              {result.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${result.poster_path}`}
                  alt={`${result.title} Poster`}
                />
              ) : (
                <div className={styles.noPoster}>No Poster Available</div>
              )}
              <button
                className={`${styles.favoriteBtn} ${
                  isFavorite(result.id) ? styles.favorited : ""
                }`}
                onClick={() =>
                  isFavorite(result.id)
                    ? removeFromFavorites(result.id)
                    : addToFavorites(result)
                }
              >
                {isFavorite(result.id) ? "❤️" : "🤍"}
              </button>
              <div className={styles.resultDetails}>
                <h1>{result.title}</h1>
                <p>{result.release_date?.split("-")[0]}</p>
              </div>
            </div>
          )
        )
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
