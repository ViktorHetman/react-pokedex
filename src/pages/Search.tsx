import React from "react";

import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	getInitialPokemonData,
	getRandomPokemonData,
} from "../redux/pokemon/asyncActions";
import PokemonCard from "../components/PokemonCard";

const Search: React.FC = () => {
	const dispatch = useAppDispatch();
	const { allPokemons, randomPokemons } = useAppSelector(
		({ pokemon }) => pokemon,
	);
	React.useEffect(() => {
		dispatch(getInitialPokemonData());
	}, [dispatch]);

	React.useEffect(() => {
		if (allPokemons) {
			const clonedPokemons = [...allPokemons];
			const randomPokemonsId = clonedPokemons
				.sort(() => Math.random() - Math.random())
				.slice(0, 20);
			dispatch(getRandomPokemonData(randomPokemonsId));
		}
	}, [allPokemons, dispatch]);

	return (
		<>
			<div className="search">
				<input
					type="text"
					className="pokemon-search-bar"
					placeholder="Search for pokemon"
				/>
				<PokemonCard pokemons={randomPokemons!} />
			</div>
		</>
	);
};

export default Wrapper(Search);
