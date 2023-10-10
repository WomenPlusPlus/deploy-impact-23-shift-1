import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { authentication } from '../Services/Authentication';
import { AuthenticationStatus } from '../Services/AuthenticationSlice';
import { RootState } from '../Services/Store';

export const SignUp = () => {
    const [password, setPassword] = useState("");
    
    const authenticationStatus:AuthenticationStatus = useSelector((state: RootState) => state.auth.status);

    if(authenticationStatus === AuthenticationStatus.InviteeAuthenticated) {
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
                        onClick={() => {authentication.signupInvitee(password)}}>
                        Set password
                    </Button>
                </div>
                <div>
                    <Button variant="contained" color="primary" 
                        onClick={() => {authentication.logOut()}}>
                        Logout
                    </Button>
                </div>
            </>
        )
    } else if(authenticationStatus === AuthenticationStatus.CandidateAuthenticated) {
        return <Navigate to="/welcome" />
    } 
    return <div>Signup failed</div>
}