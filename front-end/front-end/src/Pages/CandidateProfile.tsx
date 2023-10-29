import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { PersonalInfo } from '../Components/Profile/PersonalInfo';
import { JobInterests } from '../Components/Profile/JobInterests';
import { Experience } from '../Components/Profile/Experience';
import CandidateProfileData from '../Mocks/CandidateProfileData';

import { SectionWrapper } from "../UI/SectionWrapper";

export const CandidateProfile = () => {
    // TODO: Fetch from server
    const candidateData = CandidateProfileData;

    return (
        <Box margin="auto" maxWidth="lg">
            <Grid container spacing={2}>
                <SectionWrapper>
                    <PersonalInfo data={candidateData} />
                </SectionWrapper>
                <SectionWrapper>
                    <Experience data={candidateData} />
                </SectionWrapper>
                <SectionWrapper>
                    <JobInterests data={candidateData} />
                </SectionWrapper>
            </Grid>
        </Box>
    );
};
