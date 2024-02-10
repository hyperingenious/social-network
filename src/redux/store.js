import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import commentSlice from "./commentSlice";
import profileSlice from "./profileSlice";
import peopleToFollowSlice from "./peopleToFollowSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
    profile: profileSlice,
    peopleToFollow: peopleToFollowSlice
  },
});

export default store;