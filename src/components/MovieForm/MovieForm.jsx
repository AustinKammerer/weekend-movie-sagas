import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MovieForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  // save the genres in the store on page load for the dropdown
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);
  // get the genre list
  const genres = useSelector((store) => store.genres);

  // local state to store inputs
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    description: "",
    genre_id: "",
  });

  const handleChange = (e) => {
    // grab the name and value of the input being changed
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    // change the newMovie state according to which input is being changed
    // if the current property being set is genre, put the value in an array
    // setNewMovie({ ...newMovie, [name]: name === "genre" ? [value] : value });
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMovie);
    // send the local state object to saga
    dispatch({ type: "ADD_MOVIE", payload: newMovie });
  };
  return (
    <Grid container flexDirection="column" rowSpacing={2}>
      <Grid item>
        <Button variant="contained" onClick={() => history.push("/")}>
          Movie List
        </Button>
      </Grid>
      <Grid item>
        <Paper
          component="form"
          onChange={handleChange}
          onSubmit={handleSubmit}
          sx={{
            maxWidth: "max-content",
            p: 3,
            mx: "auto",
            backgroundColor: "rgb(24,24,24)",
            border: "1px solid rgb(70,70,70)",
          }}
          elevation={3}
        >
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="outlined"
                  name="title"
                  label="Title"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  maxRows={4}
                  variant="outlined"
                  name="poster"
                  type="text"
                  label="Poster URL"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  maxRows={4}
                  variant="outlined"
                  name="description"
                  type="text"
                  label="Description"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Genre</InputLabel>
                <Select
                  required
                  labelId="dropdown-label"
                  id="dropdown"
                  name="genre_id"
                  value={newMovie.genre_id}
                  label="Genre"
                  onChange={handleChange}
                >
                  {genres.map((genre, i) => (
                    <MenuItem key={i} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <select name="genre_id">
              <option>--Select a Genre--</option>
              {genres.map((genre, i) => (
                <option key={i} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select> */}
            </Grid>
            <Grid item xs={12} sm={3} alignSelf={"center"}>
              <Button
                variant="outlined"
                type="submit"
                size="large"
                sx={{ width: "100%" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* <form onChange={handleChange} onSubmit={handleSubmit}></form> */}
    </Grid>
  );
}
