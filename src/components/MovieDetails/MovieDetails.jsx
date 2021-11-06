import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

export default function MovieDetails() {
  // get the movie id from the url parameter
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  // on page load, fetch the movie genres and save in the store
  // combined with the url params, this lets the details survive a page refresh
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);
  // get the movie details from the store
  const details = useSelector((store) => store.details);

  return (
    <main>
      <button onClick={() => history.push("/")}>Movie List</button>
      <div>
        {/* <p>{JSON.stringify(details)}</p> */}
        <h3>{details.title}</h3>
        <img src={details.poster} alt={details.title} />
        <h4>Genres:</h4>

        {details.genres
          ? details.genres.map((genre, i) => <p key={i}>{genre}</p>)
          : null}
        <h4>Description:</h4>
        <p>{details.description}</p>
      </div>
    </main>
  );
}
