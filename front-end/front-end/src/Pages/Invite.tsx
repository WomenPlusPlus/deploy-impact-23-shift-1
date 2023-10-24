import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Select, MenuItem } from '@mui/material';

import { authentication } from '../Services/Authentication';
import { authorization } from '../Navigation/Authorization';
import { Role } from '../Services/AuthenticationSlice';

export const Invite = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(Role.Candidate.toString());

    return (
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

            <Select
                value={role}
                label="Role"
                onChange={(event) => setRole(event?.target.value)}
            > {authorization.getInviteRoles().map((role) => (
                <MenuItem value={role}>{role}</MenuItem>
            ))}

            </Select>

            <Button variant="contained" color="primary" 
                onClick={() => {authentication.inviteUser(email, role)}}>
                Send Invitation
            </Button>
        </div>
    )
}