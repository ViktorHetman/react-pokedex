import { GeneratedRandomPokemonsType } from "../redux/pokemon/types";

export interface UserPokemonType extends GeneratedRandomPokemonsType {
	firebaseId?: string;
}
