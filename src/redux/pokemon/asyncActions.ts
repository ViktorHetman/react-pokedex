import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { allPokemonsRoute } from "../../utils/constants";
import {
	GeneratedRandomPokemonsType,
	PokemonType,
	pokemonTypeInterface,
} from "./types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/pokemonTypes";
import { PokemonStatsInterface, UserPokemonType } from "../../models/types";
import { RootState } from "../store";
import { setToasts } from "../app/slice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";

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
			const pokemonsData: GeneratedRandomPokemonsType[] = [];
			for await (const pokemon of pokemons) {
				const {
					data,
				}: {
					data: {
						id: number;
						types: { type: GeneratedRandomPokemonsType }[];
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

export const appPokemonToList = createAsyncThunk(
	"pokemon/addPokemon",
	async (
		pokemon: {
			id: number;
			name: string;
			types: pokemonTypeInterface[] | string;
			stats?: PokemonStatsInterface[];
		},
		{ getState, dispatch },
	) => {
		try {
			const {
				app: { userInfo },
				pokemon: { userPokemons },
			} = getState() as RootState;
			if (!userInfo?.email) {
				return dispatch(
					setToasts("Please login in order to add pokemon to your collection."),
				);
			}
			const index = userPokemons.findIndex((userPokemon: UserPokemonType) => {
				return userPokemon.name === pokemon.name;
			});
			if (index === -1) {
				let types: string[] = [];
				types = pokemon.types as unknown as string[];
				await addDoc(pokemonListRef, {
					pokemon: { id: pokemon.id, name: pokemon.name, types },
				});
				return dispatch(setToasts(`${pokemon.name} was added to your collection`));
			} else {
				return dispatch(
					setToasts(`${pokemon.name} already exsist in ur collection`),
				);
			}
		} catch (error) {
			console.log(error);
		}
	},
);
