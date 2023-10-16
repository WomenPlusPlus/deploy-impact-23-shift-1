import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

import { authentication } from '../Services/Authentication';

export const Welcome = () => {
    return (
        <div>
            <div>
                Welcome Candidate!
            </div>
            <Button component={Link} to="/profile/">
                Let's go create a profile
            </Button>
            <br/>
            <Button variant="contained" color="primary" 
                        onClick={() => {authentication.logOut()}}>
                        Logout
                    </Button>
        </div>
    );
}