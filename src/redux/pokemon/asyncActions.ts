import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { allPokemonsRoute } from "../../utils/constants";
import { GeneratedPokemonsType, PokemonType } from "./types";

export const getInitialPokemonData = createAsyncThunk<PokemonType[]>(
	"pokemon/initialData",
	async () => {
		try {
			const { data } = await axios.get(allPokemonsRoute);
			return data.results;
		} catch (error) {
			console.log(error);
		}
	},
);

export const getRandomPokemonData = createAsyncThunk(
	"pokemon/randomPokemon",
	async (pokemons: PokemonType[]) => {
		try {
			const pokemonsData: GeneratedPokemonsType[] = [];
			for await (const pokemon of pokemons) {
				const { data } = await axios.get(pokemon.url);
			}
		} catch (error) {
			console.log(error);
		}
	},
);
