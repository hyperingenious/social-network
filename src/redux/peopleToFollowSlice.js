import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { peopleToFollow } from "../supabase/features/peopleToFollow";

export const fetchPeopleToFollow = createAsyncThunk(
    'peopleToFollow/peopleToFollow',
    async function (id) {
        const request = await peopleToFollow({ id });
        return request;
    }
);

const initialState = {
    status: "idle",
    isError: false,
    errorMessage: null,
    peopleToFollow: []
};

const peopleToFollowSlice = createSlice({
    name: "comment",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPeopleToFollow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPeopleToFollow.fulfilled, (state, { payload }) => {
                state.status = 'finished';
                state.peopleToFollow = payload;
            })
            .addCase(fetchPeopleToFollow.rejected, (state, { error }) => {
                state.status = 'error';
                state.isError = true;
                state.errorMessage = error.message;
            });
    },
});

export default peopleToFollowSlice.reducer;
