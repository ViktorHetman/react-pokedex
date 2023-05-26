import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getRandomPokemonData } from "../../redux/pokemon/asyncActions";
import PokemonCard from "../../components/PokemonCard";

const Evolution: React.FC = () => {
	const dispatch = useAppDispatch();
	const [isLoaded, setIsLoaded] = React.useState(false);
	const { currentPokemon, randomPokemons } = useAppSelector(
		({ pokemon }) => pokemon,
	);

	React.useEffect(() => {
		const fetchData = async () => {
			const pokemons = currentPokemon?.evolution.map(({ pokemon }) => pokemon);
			await dispatch(getRandomPokemonData(pokemons!));
			setIsLoaded(true);
		};
		fetchData();
	}, [dispatch, currentPokemon]);

	return (
		<div className="page">
			{isLoaded && <PokemonCard pokemons={randomPokemons!} />}
		</div>
	);
};

export default Evolution;
