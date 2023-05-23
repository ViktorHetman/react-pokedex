import { GeneratedRandomPokemonsType } from "../redux/pokemon/types";

export interface UserPokemonType extends GeneratedRandomPokemonsType {
	firebaseId?: string;
}

export enum PokemonStats {
	VULNERABLE = "vulnerable",
	WEAKNESS = "weakness",
	STRENGTH = "strength",
	RESISTANCE = "resistance",
}

export type PokemonStatType = PokemonStats;

export interface PokemonStatsInterface {
	name: string;
	value: string;
}
