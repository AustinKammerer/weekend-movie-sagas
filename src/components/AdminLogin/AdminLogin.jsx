import { useState } from 'react';
import { useHistory } from "react-router-dom";


import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";

export default function AdminLogin() {
    const history = useHistory();

    // for the form dialogue
    const [open, setOpen] = useState(false);
    const [retryOpen, setRetryOpen] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRetryClickOpen = () => {
        setRetryOpen(true);
    };

    const handleRetryClose = () => {
        setRetryOpen(false);
        setCredentials({ username: "", password: "" })
    };

    const handleChange = (e) => {
        // grab the name and value of the input being changed
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        // change the credentials state according to which input is being changed
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        if (credentials.username === 'camera' && credentials.password == 'action') {
            history.push('/admin')
        } else {
            handleRetryClickOpen();
        }
    }
    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Admin Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="admin-login">Admin Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter you username and password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        name="username"
                        value={credentials.username}
                        margin="normal"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        name="password"
                        value={credentials.password}
                        margin="normal"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin}>Login</Button>
                </DialogActions>
            </Dialog>
            {/* Dialog for login fail */}
            <Dialog
                open={retryOpen}
                onClose={handleRetryClose}
            >
                <DialogTitle id="login-retry">
                    {"Invalid Username/Password Combination"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please try again!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRetryClose}>Retry</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}