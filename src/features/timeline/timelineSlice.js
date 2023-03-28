import { createPost, deletePost, fetchPosts } from "./timelineAPI";

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
    reducers :  {
        makeLove :  {
            reducer : ( state, { type, payload }) => {
                state.posts[ state.posts.findIndex(data => data.id === payload) ].reactions.love += 1
            },
            prepare : (id) => {
                return {
                    payload : id
                }
            }
        },
        makeLike : {
            reducer : ( state, { type, payload }) => {
                state.posts[ state.posts.findIndex( data => data.id === payload )].reactions.like += 1
            },
            prepare : (id) => {
                return {
                    payload : id
                }
            }
        },
        makeDislike : {
            reducer : ( state, { type, payload }) => {
                state.posts[ state.posts.findIndex( data => data.id === payload )].reactions.dislike += 1
            },
            prepare : (id) => {
                return {
                    payload : id
                }
            }
        }
    },
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
        .addCase(deletePost.fulfilled, ( state, { type, payload}) => {
            state.status = "successed"
            state.posts = state.posts.filter(data => data.id !== payload)
            state.message = "Post delete successfull"
        })
    }
})

// selector
//  export  const getAllPosts = (state) => state.timeline.posts

// export
export const { makeLove, makeLike, makeDislike } = postSlice.actions
export default postSlice.reducer