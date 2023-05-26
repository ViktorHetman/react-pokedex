import { createSlice } from "@reduxjs/toolkit";

import { AppTypeInitialState } from "./types";
import { pokemonTabs } from "../../utils/constants";

const initialState: AppTypeInitialState = {
	toasts: [],
	userInfo: undefined,
	currentPokemonTab: pokemonTabs.description,
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
		setPokemonTab: (state, action) => {
			state.currentPokemonTab = action.payload;
		},
	},
});

export const { setToasts, clearToasts, setUserStatus, setPokemonTab } =
	appSlice.actions;

export default appSlice.reducer;
