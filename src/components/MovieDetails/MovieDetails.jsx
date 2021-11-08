import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function MovieDetails() {
  // get the movie id from the url parameter
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // on page load, fetch the movie genres and save in the store
  // combined with the url params, this lets the details survive a page refresh
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
    // send the current location to the store
    dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
  }, []);
  // get the movie details from the store
  const details = useSelector((store) => store.details);

  // click edit to go to the edit page and bring id with
  const handleEdit = () => history.push(`/edit/${id}`);

  return (
    <Grid container flexDirection="column" rowSpacing={2}>
      <Grid item>
        <Button variant="contained" onClick={() => history.push("/")}>
          Movie List
        </Button>
      </Grid>
      <Grid item>
        <Paper
          component="div"
          sx={{
            maxWidth: 600,
            p: 3,
            mx: "auto",
            backgroundColor: "rgb(24,24,24)",
            border: "1px solid rgb(70,70,70)",
          }}
        >
          <Grid container item rowSpacing={2} justifyContent="flex-end">
            <Grid item mt={-2} mr={-2}>
              <Button onClick={handleEdit}>Edit</Button>
            </Grid>
            <Grid item mt={-2} xs={12}>
              <Typography variant="h4" component="h2" px={6}>
                {details.title}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <img src={details.poster} alt={details.title} />
            </Grid>
            <Grid container item>
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                justifyContent={{ xs: "center", sm: "flex-end" }}
              >
                <Typography variant="h5" component="h3">
                  Genres
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={12}
                sm={6}
                justifyContent={{ xs: "center", sm: "flex-start" }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                {details.genres
                  ? details.genres.map((genre, i) => (
                      <Grid item key={i} xs={12} pl={{ xs: 0, sm: 2 }}>
                        <Typography variant="body1">{genre}</Typography>
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" component="h3">
                Description
              </Typography>
              <Typography
                textAlign="left"
                variant="body1"
                overflow="scroll"
                maxHeight={265}
              >
                {details.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
