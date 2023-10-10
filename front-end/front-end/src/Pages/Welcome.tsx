import Button from '@mui/material/Button';

import { authentication } from '../Services/Authentication';

export const Welcome = () => {
    return (
        <div>
            <div>
                Welcome Candidate!
            </div>
            
            <Button variant="contained" color="primary" 
                        onClick={() => {authentication.logOut()}}>
                        Logout
                    </Button>
        </div>
    );
}