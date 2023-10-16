import Button from '@mui/material/Button';

import { authentication } from '../Services/Authentication';
import { PersonalInfo } from '../Components/Profile/PersonalInfo';
import { JobInterest } from '../Components/Profile/JobInterest';
import { Experience } from '../Components/Profile/Experience';

import "../Styles/Styles.css"

export const CandidateProfile = () => {
    return (
        <>
            <div className="pageFrameLayout pageFrameStyle">
                <PersonalInfo/>
                <JobInterest/>
                <Experience/>
            </div>
            <div>
                
                {/* TODO: move to menu when menu exist */}
                <Button variant="contained" color="primary" 
                            onClick={() => {authentication.logOut()}}>
                            Logout
                        </Button>
            </div>
        </>
    );
}