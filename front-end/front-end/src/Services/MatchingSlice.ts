import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "./ApiStatus";

const apiUrl = process.env.REACT_APP_API_URL;

export interface InitialState {
    status: Status,
    matchingResult: any[],
}

const initialState: InitialState = {
    status: Status.Pending,
    matchingResult: [],
}

export const matchCandidate = createAsyncThunk(
  "match/candidate",
  async (candidateId:string) => {
    console.log("try to match candidate with id", candidateId)
    let result = await axios.post(`${apiUrl}/match_candidate_post/`,
        { "candidateid": candidateId }
    );
    console.log("matching result", result)
    if (result.status === 200) {      
      return result.data;
    } 
  }
);


export const matchingSlice = createSlice({
    name: "matchingSlice",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(matchCandidate.pending, (state) => {
            state.status = Status.Pending;
          })
          .addCase(matchCandidate.fulfilled, (state, action) => {
            state.status = Status.Fulfilled;         
            state.matchingResult = action.payload;
          })
          .addCase(matchCandidate.rejected, (state, action) => {
            state.status = Status.Rejected;
            console.log("matching failed", action.error);
          })

    },
});

export default matchingSlice.reducer;