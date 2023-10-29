import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./Store";
import { Status } from "./ApiStatus";

const apiUrl = process.env.REACT_APP_API_URL;


export interface InitialState {
    status: Status,
    jobsList: any[],
}

const initialState: InitialState = {
    status: Status.Pending,
    jobsList: [],
}

export const getJobs = createAsyncThunk(
  "jobs/get",
  async () => {
    let result = await axios.get(`${apiUrl}/get_jobs/`,);
    console.log("jobs result", result)
    if (result.status === 200) {      
      return result.data;
    } 
  }
);


export const jobsSlice = createSlice({
    name: "jobsSlice",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(getJobs.pending, (state) => {
            state.status = Status.Pending;
          })
          .addCase(getJobs.fulfilled, (state, action) => {
            state.status = Status.Fulfilled;         
            state.jobsList = action.payload;
          })
          .addCase(getJobs.rejected, (state, action) => {
            state.status = Status.Rejected;
            console.log("getJobs failed", action.error);
            // TODO: error handling
          })

    },
});

export const getJob = (state: RootState, id: string | null) => {
    if(id === null) return {};

    const job = state.jobs.jobsList.find((job) => job.jobid === id);
    
    return job;
  };

export default jobsSlice.reducer;