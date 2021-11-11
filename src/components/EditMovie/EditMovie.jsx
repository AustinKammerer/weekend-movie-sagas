import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

// sizing and font styles for genre selector dropdown
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(genreName, genres, theme) {
    return {
        fontWeight:
            genres.indexOf(genreName) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function EditMovie() {
    // get the movie id from the url parameter
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // set them for dropdown multi selector
    const theme = useTheme();

    // on page load, fetch the movie details and genre list and save in the store
    useEffect(() => {
        dispatch({ type: "FETCH_DETAILS", payload: id });
        dispatch({ type: "FETCH_GENRES" });
        // send the current location to the store
        dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
    }, []);

    // get the genre list for selector input rendering
    const genres = useSelector((store) => store.genres);

    // get the movie details from the store so the inputs have the current values in them
    const details = useSelector((store) => store.details);

    // local state to hold user's edit inputs
    // initialized with the details reducer
    const [updatedMovie, setUpdatedMovie] = React.useState({
        ...details,
    });

    const handleChange = (e) => {
        // grab the name and value of the input being changed
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        // change the updatedMovie state according to which input is being changed
        setUpdatedMovie({
            ...updatedMovie,
            [name]: value,
            genreFlag: name === "genres" ? true : false,
        });
        // if the current property being set is genre, put the value in an array
        // setUpdatedMovie({ ...updatedMovie, [name]: name === "genre" ? [value] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedMovie);
        // send the local state object to saga
        dispatch({ type: "UPDATE_MOVIE", payload: { updatedMovie, history } });
    };

    // return to details view on cancel
    const handleCancel = () => history.push(`/details/${id}`);

    return (
        <Grid container flexDirection="column" rowSpacing={2}>
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
                        <Grid item xs={12}>
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
                            <FormControl fullWidth>
                                <InputLabel id="dropdown-label">Genre</InputLabel>
                                <Select
                                    labelId="dropdown-label"
                                    multiple
                                    name="genres"
                                    value={updatedMovie.genres}
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
                                    MenuProps={MenuProps}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem
                                            key={genre.id}
                                            value={genre.name}
                                            style={getStyles(genre.name, updatedMovie.genres, theme)}
                                        >
                                            {genre.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* <Grid
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
              </Grid> */}
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
