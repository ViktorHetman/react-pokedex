import React from "react";
import { useAppSelector } from "../../redux/hooks";
import PokemonContainer from "../../components/PokemonContainer";

const Description: React.FC = () => {
	const pokemonData = useAppSelector(
		({ pokemon: { currentPokemon } }) => currentPokemon,
	);
	return (
		<div>
			<PokemonContainer image={pokemonData?.image!} />
		</div>
	);
};

export default Description;
