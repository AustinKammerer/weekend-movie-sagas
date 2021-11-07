import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export default function EditMovie() {
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

  // local state to hold user's edit inputs
  // initialized with the details reducer
  const [updatedMovie, setUpdatedMovie] = React.useState({ ...details });

  const handleChange = (e) => {
    // grab the name and value of the input being changed
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    // change the updatedMovie state according to which input is being changed
    // if the current property being set is genre, put the value in an array
    // setUpdatedMovie({ ...updatedMovie, [name]: name === "genre" ? [value] : value });
    setUpdatedMovie({ ...updatedMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedMovie);
    // send the local state object to saga
    dispatch({ type: "UPDATE_MOVIE", payload: { updatedMovie, history } });
  };

  const handleCancel = () => history.push(`/details/${id}`);

  console.log(updatedMovie);
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
          <Grid
            container
            item
            rowSpacing={2}
            columnSpacing={2}
            component="form"
            onSubmit={handleSubmit}
            justifyContent="flex-end"
          >
            <Grid item xs={12} mt={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="outlined"
                  name="title"
                  label="Title"
                  value={updatedMovie.title}
                  onChange={handleChange}
                />
              </FormControl>
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
              <FormControl fullWidth>
                <TextField
                  required
                  value={updatedMovie.description}
                  onChange={handleChange}
                  multiline
                  maxRows={8}
                  variant="outlined"
                  name="description"
                  label="Description"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button onClick={handleCancel} type="button" variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
