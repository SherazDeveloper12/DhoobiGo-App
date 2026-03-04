import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    user: null,
    alreadyExists: false,
    loading: false,
    status: null,
    error: null,
    token: null,
};
export const exisingUserCheck = createAsyncThunk(
    'auth/existingUserCheck',
    async (phone) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/auth/existing-user-check`, { phone });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
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
    reducers: {}
});


export default authSlice.reducer;