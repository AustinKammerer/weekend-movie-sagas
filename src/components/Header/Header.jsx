import { useSelector } from "react-redux";
import AdminLogin from "../AdminLogin/AdminLogin.jsx";
import { useHistory } from 'react-router-dom';

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Header() {
    const history = useHistory();

    // grab the current page's path for header conditional rendering
    const path = useSelector((store) => store.path);

    return (
        <Box mb={4}>
            <Typography variant="h2" component="h1" mb={2} color="white">
                {path === "/admin" ? "Welcome, Admin" : "My Movies"}
            </Typography>



            <Button variant="contained" onClick={() => history.push("/")} sx={{ mr: 2 }}>
                Movie List
            </Button>
            <Button variant="contained" onClick={() => history.push("/new")} sx={{ mr: 2 }}>
                Add Movie
            </Button>
            <AdminLogin />
        </Box>

    )
}