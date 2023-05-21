export interface PokemonTypeInitialState {
	allPokemons: undefined | PokemonType[];
	randomPokemons: undefined | GeneratedRandomPokemonsType[];
	status: Status;
	error: null | undefined | string;
	compareQueue: GeneratedRandomPokemonsType[];
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
