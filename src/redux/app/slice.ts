import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "./types";

const initialState: AppTypeInitialState = {
	toasts: [],
	userInfo: undefined,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setToasts: (state, action) => {
			const toasts = [...state.toasts];
			toasts.push(action.payload);
			state.toasts = toasts;
		},
		clearToasts: (state) => {
			state.toasts = [];
		},
		setUserStatus: (state, action) => {
			state.userInfo = action.payload;
		},
	},
});

export const { setToasts, clearToasts, setUserStatus } = appSlice.actions;

export default appSlice.reducer;
