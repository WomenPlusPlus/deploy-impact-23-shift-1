import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { authentication } from '../Services/Authentication';
import { AuthenticationStatus } from '../Services/AuthenticationSlice';
import { RootState } from '../Services/Store';

import Button from '../UI/Button';
import { RoundedTextField } from '../UI/StyledComponents';

import { Box, Stack } from '@mui/material';
import { Header } from '../Components/Invite/Header';
import { Footer } from '../Components/Invite/Footer';

export const SignUpContinue = () => {
    const location = useLocation()
    const { email, name, phone } = location.state;
    
    const [password, setPassword] = useState("");
    
    //const authenticationStatus:AuthenticationStatus =  AuthenticationStatus.InviteeAuthenticated as AuthenticationStatus;
    const authenticationStatus:AuthenticationStatus = useSelector(
        (state: RootState) => state.auth.status
    );

    const username = useSelector(
        (state: RootState) => state.auth.username
    );
    if(authenticationStatus === AuthenticationStatus.InviteeAuthenticated) {
        return ( 
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header/>
                <Box >
                    Create a network between companies and candidates who are meant to collaborate together.
                </Box>
                <Box sx={{ mt: 5 }} >
                    The account will be created with the provided email.
                </Box>
                <Box >
                    { username }
                </Box>
                
                {/*className="without-padding"*/} 
                <RoundedTextField
                    required
                    id="password"
                    name="password"
                    label="Your new password"
                    fullWidth
                    autoComplete="password"
                    variant="outlined"
                    type="password"
                    onChange={(event) => setPassword(event?.target.value)}
                />

                <Box sx={{ mt: 1 }} >
                    <Button 
                        style={{ textTransform: "none", padding: "0px 100px 0px 100px" }} 
                        onClick={() => {authentication.signupInvitee(password, email, name, phone)}}
                    >Create Profile</Button>
                </Box>
                <Footer/>
            </Stack>
        )
    } else if(authenticationStatus === AuthenticationStatus.Authenticated) {
        return <Navigate to="/welcome" />
    } 
    return <div>Signup failed</div>
}