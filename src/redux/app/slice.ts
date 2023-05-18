import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "./types";

const initialState: AppTypeInitialState = {};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
