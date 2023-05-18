import React from "react";

import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	getInitialPokemonData,
	getRandomPokemonData,
} from "../redux/pokemon/asyncActions";

const Search: React.FC = () => {
	const dispatch = useAppDispatch();
	const { allPokemons } = useAppSelector(({ pokemon }) => pokemon);
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

	return <div>Search</div>;
};

export default Wrapper(Search);
