import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "./MovieList.css";
import MovieItem from "../MovieItem/MovieItem.jsx";
import AdminLogin from "../AdminLogin/AdminLogin.jsx";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        dispatch({ type: "FETCH_MOVIES" });
        // send the current location to the store
        dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
    }, []);



    return (
        <Grid container rowSpacing={3} justifyContent="center">
            <Grid item>
                <Button variant="contained" onClick={() => history.push("/new")} sx={{ mr: 2 }}>
                    Add Movie
                </Button>
            </Grid>
            <Grid item>
                <AdminLogin />
            </Grid>

            <Grid
                container
                item
                mx="auto"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
            >
                {movies.map((movie) => (
                    <Grid item key={movie.id}>
                        <MovieItem movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default MovieList;
