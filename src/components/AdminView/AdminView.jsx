import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function AdminView() {
  const dispatch = useDispatch();
  const location = useLocation();

  // save the genres in the store on page load for the dropdown
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
    // send the current location to the store
    dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
  }, []);
  // get the genre list
  const genres = useSelector((store) => store.genres);
  const path = useSelector((store) => store.path);
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h4" color="white">
          {path}
        </Typography>
      </Grid>
    </Grid>
  );
}
