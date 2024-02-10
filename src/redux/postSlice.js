import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost } from "../supabase/features/createPost";
import { homeFeedPosts } from "../supabase/features/homeFeedPosts";
import { profilePosts } from "../supabase/features/profilePosts";

export const fetchCreatePost = createAsyncThunk(
    'post/createPost', async function (postDetails, dispatch) {
        const request = await createPost(postDetails,dispatch)
        return request;
    }
)

export const fetchHomeFeedPosts = createAsyncThunk(
    'post/homeFeedPosts', async function () {
        const request = await homeFeedPosts()
        return request;
    }
)

export const fetchProfilePosts = createAsyncThunk(
    'post/profilePosts', async function (id) {
        const request = await profilePosts({id})
        return request;
    }
)

const initialState = {
    status: "idle",
    isError: false,
    homeFeedPosts: [],
    profilePosts: []
};

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder

            // Creating the post
            .addCase(fetchCreatePost.pending, (state) => {
                state.status = 'loading'
                state.isError = false
            })
            .addCase(fetchCreatePost.fulfilled, (state) => {
                state.status = 'finished'
            })
            .addCase(fetchCreatePost.rejected, (state, { error }) => {
                state.status = "error";
                state.isError = error.message;
            })

            // Home feed posts
            .addCase(fetchHomeFeedPosts.pending, (state) => {
                state.status = 'loading'
                state.isError = false
            })
            .addCase(fetchHomeFeedPosts.fulfilled, (state, action) => {
                state.status = 'finished';
                state.homeFeedPosts = action.payload;
            })
            .addCase(fetchHomeFeedPosts.rejected, (state, { error }) => {
                state.status = "error";
                state.isError = error.message;
            })

            // Profile feed posts
            .addCase(fetchProfilePosts.pending, (state) => {
                state.status = 'loading'
                state.isError = false
            })
            .addCase(fetchProfilePosts.fulfilled, (state, action) => {
                state.status = 'finished';
                state.profilePosts = action.payload;
            })
            .addCase(fetchProfilePosts.rejected, (state, { error }) => {
                state.status = "error";
                state.isError = error.message;
            })

    },
});

export default postSlice.reducer;