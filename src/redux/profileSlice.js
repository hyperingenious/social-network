import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userProfile } from "../supabase/features/userProfile";

export const fetchProfileBio = createAsyncThunk(
    'profile/profilePosts', async function (id) {
        const request = await userProfile({ id })
        return request;
    }
)

const initialState = {
    status: "idle",
    isError: false,
    profileBio: {}
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: (builder) => {
        builder
            // Creating the post
            .addCase(fetchProfileBio.pending, (state) => {
                state.status = 'loading'
                state.isError = false
            })
            .addCase(fetchProfileBio.fulfilled, (state, { payload }) => {
                state.status = 'finished'
                state.profileBio = payload;
            })
            .addCase(fetchProfileBio.rejected, (state, { error }) => {
                state.status = "error";
                state.isError = error.message;
            })
    },
});

export default profileSlice.reducer;