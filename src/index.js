import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.jsx";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_DETAILS", fetchDetails);
  yield takeEvery("FETCH_GENRES", fetchGenres);
  yield takeEvery("ADD_MOVIE", addMovie);
  yield takeEvery("UPDATE_MOVIE", updateMovie);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    console.log("get all:", movies.data);
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch (error) {
    console.log("get all error", error);
  }
}

// fetch the list of genres for the form
function* fetchGenres() {
  try {
    const genres = yield axios.get("api/genre");
    console.log("get all genres:", genres.data);
    // save them in state
    yield put({ type: "SET_GENRES", payload: genres.data });
  } catch (error) {
    console.log("get all genres error", error);
  }
}

// fetch the details of a specific movie from the database (joins tables)
function* fetchDetails(action) {
  const id = action.payload;
  try {
    const details = yield axios.get(`/api/movie/${id}`);
    console.log("movie details:", details.data);
    // save the details in the redux store
    yield put({ type: "SET_DETAILS", payload: details.data[0] });
  } catch (error) {
    console.log("get movie's genres error:", error);
  }
}

// add a new movie to the database
function* addMovie(action) {
  const { newMovie, history } = action.payload;
  console.log("movie to post:", newMovie);
  try {
    // POST request
    yield axios.post(`/api/movie`, newMovie);
    console.log("post success");
    yield history.push(`/`);
  } catch (error) {
    console.log("post movie error:", error);
  }
}

// update a movie entry in the database
function* updateMovie(action) {
  const { updatedMovie, history } = action.payload;
  const { id } = updatedMovie;
  try {
    // PUT request
    yield axios.put(`/api/movie/${id}`, updatedMovie);
    console.log("put success");
    yield history.push(`/`);
  } catch (error) {
    console.log("put movie error:", error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres - list of all genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store movie details for the /details view
const details = (state = {}, action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
