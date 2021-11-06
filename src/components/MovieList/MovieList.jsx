import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieList.css";
import MovieItem from "../MovieItem/MovieItem.jsx";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <h1>Movie List</h1>
      <button onClick={() => history.push("/new")}>Add Movie</button>
      <section className="movies">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
}

export default MovieList;
