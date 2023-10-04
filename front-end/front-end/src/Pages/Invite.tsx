import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { auth } from '../Services/Authentication';

export const Invite = () => {
    const [email, setEmail] = useState("");

    return (
        <>
            <div>
                <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                onChange={(event) => setEmail(event?.target.value)}
                />

                <Button variant="contained" color="primary" 
                    onClick={() => {auth.inviteUser(email)}}>
                    Send Invitation
                </Button>
            </div>
            <div>
                <Button variant="contained" color="primary" 
                    onClick={() => {auth.logOut()}}>
                    Logout
                </Button>
            </div>
        </>
    )
}