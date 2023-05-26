import { createSlice } from "@reduxjs/toolkit";

import {
	GeneratedRandomPokemonsType,
	PokemonTypeInitialState,
	Status,
} from "./types";
import {
	getInitialPokemonData,
	getRandomPokemonData,
	getUserPokemons,
	removePokemon,
} from "./asyncActions";

const initialState: PokemonTypeInitialState = {
	allPokemons: undefined,
	randomPokemons: undefined,
	status: Status.LOADING,
	error: null,
	compareQueue: [],
	userPokemons: [],
	currentPokemon: undefined,
};

const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		addToCompare: (state, action) => {
			const index = state.compareQueue.findIndex(
				(pokemon: GeneratedRandomPokemonsType) => pokemon.id === action.payload.id,
			);
			if (index === -1) {
				if (state.compareQueue.length === 2) {
					state.compareQueue.pop();
				}
				state.compareQueue.unshift(action.payload);
			}
		},
		removeFromCompare: (state, action) => {
			const index = state.compareQueue.findIndex(
				(pokemon: GeneratedRandomPokemonsType) => pokemon.id === action.payload.id,
			);
			const queue = [...state.compareQueue];
			queue.splice(index, 1);
			state.compareQueue = queue;
		},
		setCurrentPokemon: (state, action) => {
			state.currentPokemon = action.payload;
		},
	},
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
		builder.addCase(getUserPokemons.fulfilled, (state, action) => {
			state.userPokemons = action.payload!;
		});
		builder.addCase(removePokemon.fulfilled, (state, action) => {
			const userPokemon = [...state.userPokemons];
			const index = userPokemon.findIndex(
				(pokemon) => pokemon.firebaseId === action.payload?.id,
			);
			userPokemon.splice(index, 1);
			state.userPokemons = userPokemon;
		});
	},
});

export const { addToCompare, removeFromCompare, setCurrentPokemon } =
	pokemonSlice.actions;

export default pokemonSlice.reducer;
