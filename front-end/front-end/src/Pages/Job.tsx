import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { PersonalInfo } from '../Components/Profile/PersonalInfo';
import { JobInterests } from '../Components/Profile/JobInterests';
import { Experience } from '../Components/Profile/Experience';
import { SectionWrapper } from "../UI/SectionWrapper";
import { useSelector } from 'react-redux';
import { RootState } from '../Services/Store';
import { getJob } from '../Services/JobsSlice';
import { useLocation } from 'react-router-dom';

export const Job = (props:any) => {
    const location = useLocation()
    const { id } = location.state;
    const jobData:any = useSelector((state: RootState) => getJob(state, id));

    return (
        <Box margin="auto" maxWidth="lg">
            <Grid container spacing={2}>
                <SectionWrapper>
                    <PersonalInfo data={jobData} />
                </SectionWrapper>
                <SectionWrapper>
                    <Experience data={jobData} />
                </SectionWrapper>
                <SectionWrapper>
                    <JobInterests data={jobData} />
                </SectionWrapper>
            </Grid>
        </Box>
    );
};
