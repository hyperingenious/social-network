import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readComments } from "../supabase/features/readComments";

export const fetchReadComments = createAsyncThunk(
    'comment/readComments',
    async function (postid) {
        const request = await readComments({ postid });
        return request;
    }
);

const initialState = {
    status: "idle",
    isError: false,
    errorMessage: null,
    comments: []
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReadComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReadComments.fulfilled, (state, { payload }) => {
                state.status = 'finished';
                state.comments = payload;
            })
            .addCase(fetchReadComments.rejected, (state, { error }) => {
                state.status = 'error';
                state.isError = true;
                state.errorMessage = error.message;
            });
    },
});

export default commentSlice.reducer;
