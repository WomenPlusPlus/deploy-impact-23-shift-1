import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from './ApiStatus';

const apiUrl = process.env.REACT_APP_API_URL;

export interface InitialState {
    status: Status;
    candidate: any;
}

const initialState: InitialState = {
    status: Status.Pending,
    candidate: null,
};

export const getCandidateDetails = createAsyncThunk(
    'candidate/get',
    async () => {
        let result = await axios.post(`${apiUrl}/get_candidate_details/`, {
            candidateid: '5',
        });
        console.log('get_candidate_details result', result);
        if (result.status === 200) {
            return result.data;
        }
    }
);

export const candidateSlice = createSlice({
    name: 'candidatesSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCandidateDetails.pending, (state) => {
                state.status = Status.Pending;
            })
            .addCase(getCandidateDetails.fulfilled, (state, action) => {
                state.status = Status.Fulfilled;
                state.candidate = action.payload;
            })
            .addCase(getCandidateDetails.rejected, (state, action) => {
                state.status = Status.Rejected;
                console.log('getCandidateDetails failed', action.error);
                // TODO: error handling
            });
    },
});

export default candidateSlice.reducer;
