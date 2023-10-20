import { PersonalInfo } from '../Components/Profile/PersonalInfo';
import { JobInterest } from '../Components/Profile/JobInterest';
import { Experience } from '../Components/Profile/Experience';

import "../Styles/Styles.css"

export const CandidateProfile = () => {
    return (
        <div className="pageFrameLayout pageFrameStyle">
            <PersonalInfo/>
            <JobInterest/>
            <Experience/>
        </div>
    );
}