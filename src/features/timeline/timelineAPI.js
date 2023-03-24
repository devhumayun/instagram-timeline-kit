import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create a timeline posts get API
export const fetchPosts = createAsyncThunk("timeline/fetchPosts", async() => {
    const response = await axios.get("http://localhost:5050/posts")
    return response.data
})

// create new post
export const createPost = createAsyncThunk("timeline/createPost", async(data) => {
    const response = await axios.post("http://localhost:5050/posts", data)
    return response.data
})