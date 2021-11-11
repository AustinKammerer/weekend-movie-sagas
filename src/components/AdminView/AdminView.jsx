import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Chip from '@mui/material/Chip';

export default function AdminView() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // save the genres in the store on page load for the dropdown
    useEffect(() => {
        dispatch({ type: "FETCH_GENRES" });
        // send the current location to the store
        dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
    }, []);
    // get the genre list
    const genres = useSelector((store) => store.genres);
    const path = useSelector((store) => store.path);

    // local state to hold new genre input
    const [newGenre, setNewGenre] = useState("");
    // handle input changes
    const handleChange = (e) => {
        console.log(e.target.value);
        setNewGenre(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newGenre);
        dispatch({ type: "ADD_GENRE", payload: { genre: newGenre } })
        setNewGenre("");
    };

    const handleDelete = (genre) => {
        console.log(genre.id);
        dispatch({ type: "DELETE_GENRE", payload: genre })
    }

    return (
        <Paper component="div" sx={{
            maxWidth: 600,
            p: 3,
            mx: "auto",
            backgroundColor: "rgb(24,24,24)",
            border: "1px solid rgb(70,70,70)",
        }}>
            <Grid container rowSpacing={4} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" color="white">
                        Update Genres
                    </Typography>
                </Grid>
                <Grid container item component="form" onSubmit={handleSubmit} justifyContent="space-around">
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                value={newGenre}
                                variant="outlined"
                                name="genre"
                                label="Genre"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item alignSelf="center">
                        <Button type="submit" variant="outlined" size="large">
                            Add
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item columnSpacing={2} rowSpacing={2}>
                    {genres?.map(genre => (
                        <Grid item key={genre.id}>
                            <Chip label={genre.name} onDelete={() => handleDelete(genre)} />
                        </Grid>

                    ))}
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => history.push('/')}>Logout</Button>
                </Grid>
            </Grid>
        </Paper >
    );
}
