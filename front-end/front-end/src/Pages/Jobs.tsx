import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";

import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { Status } from "../Services/ApiStatus"
import { getJobs } from "../Services/JobsSlice";
import { RootState } from "../Services/Store";

import "../Styles/Styles.css"
import { SectionWrapper } from "../UI/SectionWrapper";
import Button from '../UI/Button';


export const Jobs = () => {    
    const dispatch:ThunkDispatch<RootState, void, Action> = useDispatch();
    const { status, jobsList }:{status:Status, jobsList:any[]} = useSelector((state: RootState) => state.jobs);

    useEffect(() => {
        if(status !== Status.Fulfilled) {
            dispatch(getJobs());
        }
    });

    return (
        <Box margin="auto" maxWidth="lg">
            <SectionWrapper>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                        Jobs
                    </Typography>
                    <Link to="/job" state={{ id: null }}><Button><AddIcon/> New job</Button></Link>
                </Stack>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Published on</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> 
                        {jobsList.map((job: any) => ( 
                            <TableRow key={job.jobid}> 
                                <TableCell>{job.title}</TableCell> 
                                <TableCell>{job.location}</TableCell> 
                                <TableCell>{job.is_published ? "published" : "not published"}</TableCell> 
                                <TableCell>{job.published_on ? new Date(job.published_on).toDateString() : ""}</TableCell> 
                                <TableCell>{job.description}</TableCell> 
                                <TableCell><Link to="/job" state={{ id: job.jobid }}><DriveFileRenameOutlineIcon/></Link></TableCell>
                            </TableRow> 
                        ))} 
                    </TableBody>                         
                </Table>
            </SectionWrapper>
        </Box>
    );
}