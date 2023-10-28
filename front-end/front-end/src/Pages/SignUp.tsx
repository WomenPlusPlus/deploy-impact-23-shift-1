import { useSelector } from 'react-redux';
import { useState, ChangeEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MuiPhoneNumber from 'material-ui-phone-number-2'

import { Box, Stack } from '@mui/material';

import { authentication } from '../Services/Authentication';
import { AuthenticationStatus } from '../Services/AuthenticationSlice';
import { RootState } from '../Services/Store';

import Button from '../UI/Button';
import { RoundedTextField } from '../UI/StyledComponents';

import { Header } from '../Components/Invite/Header';
import { Footer } from '../Components/Invite/Footer';

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState('');
    //const authenticationStatus:AuthenticationStatus =  AuthenticationStatus.InviteeAuthenticated as AuthenticationStatus;
    const authenticationStatus:AuthenticationStatus = useSelector(
        (state: RootState) => state.auth.status
    );

    const handleOnChange = (
        newValue: string | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        setPhone(newValue as string);
      };

    if(authenticationStatus === AuthenticationStatus.InviteeAuthenticated) {
        return ( 
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header/>

                <Box className="textStyle" >
                    Get in contact with potential candidates for your open job positions.
                </Box>
                <Box sx={{ mt: 5 }} className="textStyle" >
                    The following details create the {authentication.getMyRole()} profile to manage the platform.
                </Box>      

                <Box sx={{ mt: 5 }} >
                    {/*className="without-padding"*/} 
                    <RoundedTextField
                        required
                        id="outlined"
                        name="email"
                        label="email"
                        fullWidth
                        autoComplete="email"
                        variant="outlined"
                        type="email"
                        onChange={(event) => setEmail(event?.target.value)}
                    />
                </Box>
                <Box sx={{ mt: 1 }} >
                    {/*className="without-padding"*/} 
                    <RoundedTextField
                        required
                        id="name"
                        label="name"
                        fullWidth
                        autoComplete="name"
                        variant="outlined"
                        onChange={(event) => setName(event?.target.value)}
                    />
                </Box>
                <Box sx={{ mt: 1 }} >
                    {/*className="without-padding"*/} 
                    <MuiPhoneNumber style={{width: 500}}
                        defaultCountry="ch"
                        fullWidth
                        label="Phone number"
                        margin="dense"
                        variant="outlined"
                        onChange={value => handleOnChange(value)}
                    />
                </Box>

                <Box sx={{ mt: 1 }} >
                    <Link to="/signupcontinue"  
                        state={{ 
                            email: email,
                            name: name,
                            phone: phone,
                        }}
                    >
                        <Button style={{ textTransform: "none", padding: "0px 100px 0px 100px" }} >Continue</Button>
                    </Link>
                </Box>

                <Footer/>
            </Stack>
        )
    } else if(authenticationStatus === AuthenticationStatus.Authenticated) {
        return <Navigate to="/welcome" />
    } 
    return <div>Signup failed</div>
}