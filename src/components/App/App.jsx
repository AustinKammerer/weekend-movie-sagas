import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList.jsx";
import MovieDetails from "../MovieDetails/MovieDetails.jsx";
import MovieForm from "../MovieForm/MovieForm.jsx";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App() {
  return (
    <Container maxWidth="xl" sx={{ textAlign: "center", px: 0 }}>
      <Router>
        <Typography variant="h2" component="h1" mb={2}>
          My Movies
        </Typography>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path={"/details/:id"}>
          <MovieDetails />
        </Route>
        {/* Add Movie page */}
        <Route path={"/new"}>
          <MovieForm />
        </Route>
      </Router>
    </Container>
  );
}

export default App;
