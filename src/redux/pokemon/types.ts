import { PokemonStatType, UserPokemonType } from "../../models/types";

export interface PokemonTypeInitialState {
	allPokemons: undefined | PokemonType[];
	randomPokemons: undefined | GeneratedRandomPokemonsType[];
	status: Status;
	error: null | undefined | string;
	compareQueue: GeneratedRandomPokemonsType[];
	userPokemons: UserPokemonType[];
	currentPokemon: CurrentPokemonType | undefined;
}

export enum Status {
	LOADING = "pending",
	SUCCESS = "fulfilled",
	ERROR = "rejected",
}

export type PokemonType = {
	name: string;
	url: string;
};

export interface GeneratedRandomPokemonsType {
	name: string;
	id: number;
	image: string;
	types: pokemonTypeInterface[];
}

export interface pokemonTypeInterface {
	[key: string]: {
		image: string;
		resistance: string[];
		strength: string[];
		weakness: string[];
		vulnerable: string[];
	};
}

export interface CurrentPokemonType {
	id: number;
	name: string;
	types: pokemonTypeInterface[];
	image: string;
	stats: PokemonStatType;
	encounters: string[];
	evolution: { level: number; pokemon: { name: string; url: string } }[];
	pokemonAbilities: { abilities: string[]; moves: string[] };
	evolutionLevel: number;
}
