export interface PokemonTypeInitialState {
	allPokemons: undefined | PokemonType[];
	status: Status;
	error: null | undefined | string;
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

// export interface PokemonRequest {
// 	count: number;
// 	next: null;
// 	previous: null;
// 	results: PokemonType[];
// }
export interface GeneratedPokemonsType {
	name: string;
	id: number;
	imgae: string;
	// types
}
