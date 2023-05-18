import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { allPokemonsRoute } from "../../utils/constants";
import { GeneratedPokemonsType, PokemonType } from "./types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/pokemonTypes";

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
				const {
					data,
				}: {
					data: {
						id: number;
						types: { type: GeneratedPokemonsType }[];
					};
				} = await axios.get(pokemon.url);
				const types = data.types.map(
					({ type: { name } }: { type: { name: string } }) => ({
						// @ts-expect-error
						[name]: pokemonTypes[name],
					}),
				);
				// @ts-expect-error
				let image: string = images[data.id];
				if (!image) {
					// @ts-expect-error
					image = defaultImages[data.id];
				}

				if (image) {
					pokemonsData.push({
						name: pokemon.name,
						id: data.id,
						image,
						types,
					});
				}
			}
			return pokemonsData;
		} catch (error) {
			console.log(error);
		}
	},
);
