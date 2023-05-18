import { createSlice } from "@reduxjs/toolkit";

import { PokemonTypeInitialState, Status } from "./types";
import { getInitialPokemonData, getRandomPokemonData } from "./asyncActions";

const initialState: PokemonTypeInitialState = {
	allPokemons: undefined,
	randomPokemons: undefined,
	status: Status.LOADING,
	error: null,
};

const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
			state.allPokemons = action.payload;
			state.status = Status.SUCCESS;
			state.error = null;
		});
		builder.addCase(getInitialPokemonData.pending, (state) => {
			state.status = Status.LOADING;
			state.error = null;
		});
		builder.addCase(getInitialPokemonData.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.error = action.error.message;
		});
		builder.addCase(getRandomPokemonData.fulfilled, (state, action) => {
			state.randomPokemons = action.payload;
			state.error = null;
			state.status = Status.SUCCESS;
		});
		builder.addCase(getRandomPokemonData.pending, (state) => {
			state.error = null;
			state.status = Status.LOADING;
		});
		builder.addCase(getRandomPokemonData.rejected, (state, action) => {
			state.error = action.error.message;
			state.status = Status.ERROR;
		});
	},
});

// export const {} = pokemonSlice.actions;

export default pokemonSlice.reducer;
