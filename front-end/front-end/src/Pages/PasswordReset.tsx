import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { authentication } from '../Services/Authentication';
import { AuthenticationStatus } from '../Services/AuthenticationSlice';
import { RootState } from '../Services/Store';

export const PasswordReset = () => {
    const [password, setPassword] = useState("");
    
    const authenticationStatus:AuthenticationStatus = useSelector((state: RootState) => state.auth.status);

    if(authenticationStatus === AuthenticationStatus.Authenticated) {
        return <Navigate to="/" />
    } else {
        return ( 
            <>           
                <div>
                    <TextField
                    required
                    id="password"
                    name="password"
                    label="Your new password"
                    fullWidth
                    autoComplete="password"
                    variant="standard"
                    type="password"
                    onChange={(event) => setPassword(event?.target.value)}
                    />

                    <Button variant="contained" color="primary" 
                        onClick={() => {authentication.passwordReset(password)}}>
                        Set password
                    </Button>
                </div>
            </>
        )
    } 
}