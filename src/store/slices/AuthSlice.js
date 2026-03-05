import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constant from "expo-constants";
const BASE_URL = Constant.expoConfig.extra.apiUrl;
const initialState = {
  
    user: null,
    otpSent: false,
    loading: false,
    status: null,
    error: null,
    token: null,
};
export const AuthenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (phone) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/createOtp/${phone}`);
            console.log("Response from OTP creation: ", response);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("Error response from OTP creation: ", error);
                throw new Error(error.response.data.message);
            }
            console.error("Error during OTP creation: ", error);
            throw error;
        }
    });
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    });

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (otpData) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/auth/verify-otp`, otpData);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AuthenticateUser.pending, (state) => {
                console.log("Authenticating user...loading");
            })
            .addCase(AuthenticateUser.fulfilled, (state, action) => {
                console.log("User authentication successful: ", action.payload);
               
                state.otpSent = true;
                // state.status = 'succeeded';
            })
            .addCase(AuthenticateUser.rejected, (state, action) => {
                console.error("User authentication failed: ", action.error.message);
                // state.error = action.error.message;
                // state.status = 'failed';
            })
    }
});



export default authSlice.reducer;