
import { createSlice } from "@reduxjs/toolkit";
// create timeline slice
const postSlice = createSlice({
    name : "post",
    initialState : {
        post : "",
        status : "idle" /* loading | successed | failed */,
        message : null,
        error : null
    },
    reducers : {},
    extraReducers : () => {

    }
})

export const {} = postSlice.actions
export default postSlice.reducer
 