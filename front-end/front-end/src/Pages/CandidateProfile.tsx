import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { RootState } from '../Services/Store';
import { Status } from '../Services/ApiStatus';
import { getCandidateDetails } from '../Services/CandidateSlice';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { PersonalInfo } from '../Components/Profile/PersonalInfo';
import { JobInterests } from '../Components/Profile/JobInterests';
import { Experience } from '../Components/Profile/Experience';

import { SectionWrapper } from '../UI/SectionWrapper';

export const CandidateProfile = () => {
    const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
    const { status, candidate }: { status: Status; candidate: any } =
        useSelector((state: RootState) => state.candidate);

    useEffect(() => {
        if (status !== Status.Fulfilled) {
            dispatch(getCandidateDetails());
        }
    }, []);

    console.log('candidate', candidate);

    return (
        <Box margin="auto" maxWidth="lg">
            <Grid container spacing={2}>
                <SectionWrapper>
                    <PersonalInfo data={candidate} />
                </SectionWrapper>
                <SectionWrapper>
                    <Experience data={candidate} />
                </SectionWrapper>
                <SectionWrapper>
                    <JobInterests data={candidate} />
                </SectionWrapper>
            </Grid>
        </Box>
    );
};
