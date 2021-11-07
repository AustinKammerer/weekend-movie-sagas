import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

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
    genres: [],
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
    <Box>
      <Button variant="contained" onClick={() => history.push("/")}>
        Movie List
      </Button>
      <Typography variant="h4" component="h2">
        Add a Movie
      </Typography>
      <Paper
        component="form"
        onChange={handleChange}
        onSubmit={handleSubmit}
        sx={{ maxWidth: "fit-content", p: 3, mx: "auto" }}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              name="title"
              type="text"
              label="Title"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              multiline
              maxRows={4}
              variant="outlined"
              name="poster"
              type="text"
              label="Poster URL"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              multiline
              maxRows={4}
              variant="outlined"
              name="description"
              type="text"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="dropdown-label">Genre</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                multiple
                name="genres"
                value={newMovie.genres}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, i) => (
                      <Chip key={i} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.name}>
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
          <Grid item xs>
            <Button variant="outlined" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* <form onChange={handleChange} onSubmit={handleSubmit}></form> */}
    </Box>
  );
}
