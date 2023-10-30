import Box from '@mui/material/Box';

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { RootState } from '../Services/Store';
import { addJob, getJob, updateJob } from '../Services/JobsSlice';
import { useLocation } from 'react-router-dom';
import { Grid, Stack, Typography, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import EditableTypography from '../UI/EditableTypography';
import Button from '../UI/Button';

export const Job = (props:any) => {
    const location = useLocation()
    const { id } = location.state;
    const jobData:any = useSelector((state: RootState) => getJob(state, id));
    const [title, setTitle] = useState(jobData?.title);
    const [description, setDescription] = useState(jobData?.description);
    const [published, setPublished] = useState(jobData?.is_published);
    const [publishedOn, setPublishedOn] = useState(jobData?.is_published);

    const dispatch:ThunkDispatch<RootState, void, Action> = useDispatch();

    return (
        <Box margin="auto" maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    Title:
                </Grid>
                <Grid item xs={7}>
                    <EditableTypography onChange={setTitle}>{title}</EditableTypography>
                </Grid>
                <Grid item xs={3}>
                    Description:
                </Grid>
                <Grid item xs={7}>
                    <EditableTypography onChange={setDescription}>{description}</EditableTypography>
                </Grid>
                <Grid item xs={10}>
                    Published:
                    <Checkbox  checked={published} onChange={(event) => setPublished(event.target.checked)}></Checkbox>
                </Grid>     
                <Grid item xs={3}>
                    Published on:
                </Grid>
                <Grid item xs={7}>
                <DatePicker
                    value={dayjs(publishedOn)}
                    onChange={(newValue) => setPublishedOn(newValue)}
                />
                </Grid>
        </Grid>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Button onClick={() => {
                    const newData:any = { 
                        title: title, 
                        description: description, 
                        is_published: published, 
                        published_on: publishedOn ? publishedOn.toDate().toISOString().slice(0, 10) : (new Date()).toISOString().slice(0, 10)
                    }   
                    if(jobData.job_id) {
                        newData["job_id"] = jobData.job_id;
                        dispatch(updateJob({    
                            newData: newData
                        }))
                    } else {
                        newData["company_id"] = 1;
                        console.log("xxx", newData)
                        dispatch(addJob({    
                            newData: newData
                        }))
                    }
                    }} sx={{ ml: 1 }}>
                        <Typography ml={1}>Save Job</Typography>
                </Button>                
            </Stack>
        </Box>
    );
};
