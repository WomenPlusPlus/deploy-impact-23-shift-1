import { useState } from 'react';
import { Select, MenuItem, Stack, Box, InputLabel, FormControl, FormHelperText, SelectChangeEvent } from '@mui/material';

import { authentication } from '../Services/Authentication';
import { authorization } from '../Navigation/Authorization';
import { Role } from '../Services/AuthenticationSlice';

import { RoundedTextField } from '../UI/StyledComponents';
import  Button from "../UI/Button"

export const Invite = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
        >                         
        
            <Box sx={{ mt: 1 }} className="headingStyle">
                New Invitation
            </Box>             
        
            <Box sx={{ mt: 1, width: 300 }} className="textStyle" >
                Create a network between companies and candidates who are meant to collaborate together.
            </Box>   
            
            <Box sx={{ mt: 1 }} >
                {/*className="without-padding"*/} 
                <RoundedTextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"                
                    onChange={(event) => setEmail(event?.target.value)}
                    />

            </Box>

            <Box sx={{ mt: 1 }} >
              {/*
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                <RoundedTextField
                required
                select
                label="Role"
                variant="outlined"
                onChange={(event) => setRole(event?.target.value)}
                sx={{width: 300}}
                className="without-padding"
                >
                {authorization.getInviteRoles().map((role) => (
                    <MenuItem value={role}>{role}</MenuItem>
                    ))}
                    </RoundedTextField>
                    </FormControl>   
                */}  

                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <Select
                        labelId="select-role-label"
                        id="select-role"
                        value={role}
                        label="Role"
                        className="without-padding"
                        onChange={(event) => setRole(event?.target.value)}
                    >
                        {authorization.getInviteRoles().map((role) => (
                            <MenuItem value={role}>{role}</MenuItem>
                        ))}
                    </Select>
                </FormControl>                

            </Box>
            <Box sx={{ mt: 1 }} >
                <Button 
                    style={{ textTransform: "none", padding: "0px 100px 0px 100px" }} 
                    
                    onClick={() => {authentication.inviteUser(email, role)}}>
                    Send Invitation
                </Button>
            </Box>
        </Stack>
    )
}