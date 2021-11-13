import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    const request = await fetch(`https://swapi.dev/api/films/`);
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading movies...</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Search for movies</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
