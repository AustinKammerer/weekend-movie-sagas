import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

function getStyles(genreName, genres, theme) {
  return {
    fontWeight:
      genres.indexOf(genreName) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MovieForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  // set them for dropdown multi selector
  const theme = useTheme();

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
    genres: [],
  });

  const handleChange = (e) => {
    // grab the name and value of the input being changed
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    // change the newMovie state according to which input is being changed
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMovie);
    // send the local state object to saga
    dispatch({ type: "ADD_MOVIE", payload: { newMovie, history } });
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
            maxWidth: 1050,
            p: 3,
            mx: "auto",
            backgroundColor: "rgb(24,24,24)",
            border: "1px solid rgb(70,70,70)",
          }}
          elevation={3}
        >
          <Grid container item rowSpacing={2} columnSpacing={2}>
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
            <Grid item xs>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Genre</InputLabel>
                <Select
                  labelId="dropdown-label"
                  multiple
                  name="genres"
                  value={newMovie.genres}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, i) => (
                        <Chip key={i} label={value} />
                      ))}
                    </Box>
                  )}
                  // MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem
                      key={genre.id}
                      value={genre.name}
                      style={getStyles(genre.name, newMovie.genres, theme)}
                    >
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              alignSelf={"center"}
              justifyContent="flex-end"
            >
              <Button
                onClick={() => history.push("/")}
                variant="outlined"
                type="button"
                size="large"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" size="large">
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
