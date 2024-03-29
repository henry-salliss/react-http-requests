import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://react-http-b2538-default-rtdb.firebaseio.com/movies.json`
      );
      if (!request.ok) {
        throw new Error("Something went wrong...");
      }

      const data = await request.json();
      console.log(data);

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const addMovieHandler = async (movie) => {
    const request = await fetch(
      "https://react-http-b2538-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await request.json();
    console.log(data);
  };

  let content = <p>Search for movies...</p>;

  if (error) content = <p>{error}</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;

  if (isLoading) content = <p>Loading movies...</p>;

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
