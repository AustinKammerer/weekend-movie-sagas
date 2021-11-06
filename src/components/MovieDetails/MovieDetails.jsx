import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

export default function MovieDetails() {
  // get the movie id from the url parameter
  const { id } = useParams();
  // on page load, fetch the movie details and save in the store
  // combined with the url params, this lets the details survive a page refresh
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);
  // get the movie details from the store
  const details = useSelector((store) => store.details);

  return <p>{id}</p>;
}
