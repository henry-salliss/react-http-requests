import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchMovieHandler = async () => {
    try {
      setIsLoading(true);
      const request = await fetch(`https://swapi.dev/api/films/`);
      if (!request.ok) {
        throw new Error("Something went wrong...");
      }

      const data = await request.json();
      const transformedMovieData = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_data,
        };
      });
      setMovies(transformedMovieData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  let content = <p>Search for movies...</p>;

  if (error) content = <p>{error}</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;

  if (isLoading) content = <p>Loading movies...</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
