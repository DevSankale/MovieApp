import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Search from './components/Search.jsx';
import MovieList from './components/movieList.jsx';
import Favorites from './pages/Favorites.jsx';
import Navbar from './components/Navbar.jsx';
import { MovieProvider } from "./contexts/movieContext.jsx";

function App() {
  const URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "7e06743d1dcbaa4daff5918330e29a4f";
  const DEFAULT_URL = "https://api.themoviedb.org/3/movie/popular";

  const [movie, setMovie] = useState('');
  const [results, setResults] = useState([]);
  const [debouncedMovie, setDebouncedMovie] = useState("");
  const location = useLocation();

  useEffect(() => {
    async function fetchDefaultMovies() {
      try {
        const res = await fetch(`${DEFAULT_URL}?api_key=${API_KEY}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Failed to fetch default movies:", error);
      }
    }

    if (location.pathname === "/") {
      setMovie('');
      fetchDefaultMovies();
    }
  }, [location, DEFAULT_URL, API_KEY]);

  
  const onFavoriteClick = (movie) => {
    console.log(`Favorite clicked for movie: ${movie.title}`);
    
  };

  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Search
          movie={movie}
          setMovie={setMovie}
          results={results}
          setResults={setResults}
          URL={URL}
          API_KEY={API_KEY}
          debouncedMovie={debouncedMovie}
          setDebouncedMovie={setDebouncedMovie}
        />

        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                results={results}
                movie={movie}
                onFavoriteClick={onFavoriteClick} 
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites />}
          />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
