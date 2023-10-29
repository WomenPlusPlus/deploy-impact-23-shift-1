import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { RootState } from "../Services/Store";
import { Status } from "../Services/ApiStatus";
import { matchCandidate } from "../Services/MatchingSlice";
import { getJobs } from "../Services/JobsSlice";

import "../Styles/Styles.css"

export const MatchMe = () => {  
    const location = useLocation()
    const { candidateId } = location.state;

    const dispatch:ThunkDispatch<RootState, void, Action> = useDispatch();
    const { status, matchingResult }:{status:Status, matchingResult:any[]} = useSelector((state: RootState) => state.matching);
    const { status:jobStatus, jobsList }:{status:Status, jobsList:any[]} = useSelector((state: RootState) => state.jobs);
    
    useEffect(() => {
        if(status !== Status.Fulfilled) {
            dispatch(matchCandidate(candidateId));
        }
        if(jobStatus !== Status.Fulfilled) {         
            dispatch(getJobs());
        }        
    });


    return (
        <div className="pageFrameLayout pageFrameStyle">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Job Description</TableCell>
                            <TableCell>Matching Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> 
                        {matchingResult.map((result: any) => ( 
                            <TableRow key={result.job_id}>  
                            <TableCell>{jobsList[result.job_id]?.title}</TableCell> 
                            <TableCell>{jobsList[result.job_id]?.description}</TableCell> 
                            <TableCell>{((result.matching_score) * 100).toFixed(2)}</TableCell> 
                            </TableRow> 
                        ))} 
                    </TableBody>                         
                </Table>
        </div>
    );
}