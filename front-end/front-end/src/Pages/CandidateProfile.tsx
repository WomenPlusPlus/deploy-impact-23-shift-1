import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { PersonalInfo } from '../Components/Profile/PersonalInfo';
import { JobInterests } from '../Components/Profile/JobInterests';
import { Experience } from '../Components/Profile/Experience';
import Stack from '@mui/material/Stack';
import CandidateProfileData from '../Mocks/CandidateProfileData';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <Grid item sm={12} md={4}>
        <Card variant="outlined" sx={{ padding: 2 }}>
            <Stack spacing={2}>{children}</Stack>
        </Card>
    </Grid>
);

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
