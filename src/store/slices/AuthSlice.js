import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import Constant from "expo-constants";
const BASE_URL = Constant.expoConfig.extra.apiUrl;
const initialState = {

    user: null,
    otpSent: false,
    loading: true,
    status: null,
    error: null,
    token: null,
};
export const AuthenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (phone) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/createOtp/${phone}`);
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


export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (otpData) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/authenticateUser`, otpData);
            await SecureStore.setItemAsync('token', response.data.token);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("Error response from OTP verification: ", error);
                throw new Error(error.response.data.message);
            }
            console.error("Error during OTP verification: ", error);
            throw error;
        }
    });

export const userProfile = createAsyncThunk(
    'auth/userProfile',
    async (token) => {
        try {

            const response = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("Error response from fetching user profile: ", error);
                throw new Error(error.response.data.message);
            }
            console.error("Error during fetching user profile: ", error);
            throw error;
        }
    });

export const fetchTokenFromStorage = createAsyncThunk(
    'auth/fetchTokenFromStorage',
    async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                return token;
            }else{
                throw new Error("No token found in storage");
            }

        } catch (error) {
            console.error("Error fetching token from storage: ", error);
            throw error;
        }
    });
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetotpState: (state) => {
            state.otpSent = false;
            state.loading = false;
            state.status = null;
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthenticateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthenticateUser.fulfilled, (state, action) => {

                state.otpSent = true;
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(AuthenticateUser.rejected, (state, action) => {
                console.error("User authentication failed: ", action.error.message);
                state.error = action.error.message;
                state.status = 'failed';
                state.loading = false;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                console.log("OTP verification successful: ", action.payload);
                state.user = action.payload.newUser;
                state.token = action.payload.token;
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                console.error("OTP verification failed: ", action.error.message);
                state.error = action.error.message;
                state.status = 'failed';
                state.loading = false;
            })
            .addCase(fetchTokenFromStorage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTokenFromStorage.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
            })
            .addCase(fetchTokenFromStorage.rejected, (state, action) => {
                console.error("Fetching token from storage failed: ", action.error.message);
                state.loading = false;
            })
            .addCase(userProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(userProfile.rejected, (state, action) => {
                console.error("Fetching user profile failed: ", action.error.message);
                state.loading = false;
            });
    }
});


export const { resetotpState, } = authSlice.actions;
export default authSlice.reducer;