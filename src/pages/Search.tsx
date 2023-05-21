import React from "react";

import Wrapper from "../sections/Wrapper";
import PokemonCard from "../components/PokemonCard";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	getInitialPokemonData,
	getRandomPokemonData,
} from "../redux/pokemon/asyncActions";
import { debounce } from "../utils/debounce";

const Search: React.FC = () => {
	const dispatch = useAppDispatch();
	const handleSearch = debounce((value: string) => getPokemons(value), 300);
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

	const getPokemons = async (value: string) => {
		if (value.length) {
			const pokemons = allPokemons?.filter((pokemon) =>
				pokemon.name.includes(value.toLowerCase()),
			);
			dispatch(getRandomPokemonData(pokemons!));
		} else {
			const clonedPokemons = [...(allPokemons as [])];
			const randomPokemonsId = clonedPokemons
				.sort(() => Math.random() - Math.random())
				.slice(0, 20);
			dispatch(getRandomPokemonData(randomPokemonsId));
		}
	};

	return (
		<>
			<div className="search">
				<input
					type="text"
					className="pokemon-search-bar"
					placeholder="Search for pokemon"
					onChange={(e) => handleSearch(e.target.value)}
				/>
				<PokemonCard pokemons={randomPokemons!} />
			</div>
		</>
	);
};

export default Wrapper(Search);
