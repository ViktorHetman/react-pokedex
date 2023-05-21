import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "./types";

const initialState: AppTypeInitialState = {
	toasts: [],
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
	},
});

export const { setToasts, clearToasts } = appSlice.actions;

export default appSlice.reducer;
