import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addDoc,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
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

export const addPokemonToList = createAsyncThunk(
	"pokemon/addPokemon",
	async (
		pokemon: {
			id: number;
			name: string;
			types: pokemonTypeInterface[];
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
				if (!pokemon.stats) {
					pokemon.types.forEach((type: any) => {
						types.push(Object.keys(type).toString());
					});
				} else {
					types = pokemon.types as unknown as string[];
				}

				await addDoc(pokemonListRef, {
					pokemon: { id: pokemon.id, name: pokemon.name, types },
					email: userInfo.email,
				});
				await dispatch(getUserPokemons());
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

export const getUserPokemons = createAsyncThunk(
	"pokemons/userList",
	async (args, { getState }) => {
		try {
			const {
				app: { userInfo },
			} = getState() as RootState;
			if (!userInfo) {
				return;
			}
			const firestoreQuery = query(
				pokemonListRef,
				where("email", "==", userInfo.email),
			);
			const fetchedPokemons = await getDocs(firestoreQuery);
			if (fetchedPokemons.docs.length) {
				const userPokemons: UserPokemonType[] = [];
				fetchedPokemons.forEach(async (pokemon) => {
					const pokemons = await pokemon.data().pokemon;
					// @ts-ignore
					let image = images[pokemons.id];
					if (!image) {
						// @ts-ignore
						image = defaultImages[pokemons.id];
					}
					const types = pokemons.types.map((name: string) => ({
						// @ts-ignore
						[name]: pokemonTypes[name],
					}));
					userPokemons.push({
						...pokemons,
						firebaseId: pokemon.id,
						image,
						types,
					});
				});
				return userPokemons;
			}
			return [];
		} catch (error) {
			console.log(error);
		}
	},
);

export const removePokemon = createAsyncThunk(
	"pokemon/removePokemon",
	async ({ id }: { id: string }) => {
		try {
			await deleteDoc(doc(pokemonListRef, id));
			return { id };
		} catch (error) {
			console.log(error);
		}
	},
);
