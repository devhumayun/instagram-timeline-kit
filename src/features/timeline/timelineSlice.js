import { createPost, fetchPosts } from "./timelineAPI";

const { createSlice } = require("@reduxjs/toolkit");

// create a timeline post slice
const postSlice = createSlice({
    name : "timeline",
    initialState : {
        posts : [],
        status : "idle" /* loading | successed | failed */,
        message : null,
        error : null
    },
    reducers : () => {},
    extraReducers : (builder) => {
        builder.addCase( fetchPosts.pending, ( state, { type, payload }) => {
            state.status = "loading"
        })
        .addCase( fetchPosts.fulfilled, ( state, { type, payload }) => {
            state.status = "successed"
            state.posts = payload
            state.message = "All posts loaded"
        })
        .addCase( fetchPosts.rejected, ( state, { type, payload}) => {
            state.status = "failed"
            state.error = "Posts loaded failed"
        })
        .addCase(createPost.fulfilled, ( state, { type, payload}) => {
            state.status = "successed"
            state.posts.push(payload)
            state.message = "Post created successfull"
        })
    }
})

// selector
//  export  const getAllPosts = (state) => state.timeline.posts

// export
export const {} = postSlice.actions
export default postSlice.reducer