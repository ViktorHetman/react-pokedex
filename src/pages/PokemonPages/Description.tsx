import React from "react";
import { useAppSelector } from "../../redux/hooks";
import PokemonContainer from "../../components/PokemonContainer";
import Info from "../../components/Info";

const Description: React.FC = () => {
	const pokemonData = useAppSelector(
		({ pokemon: { currentPokemon } }) => currentPokemon,
	);
	return (
		<div>
			{pokemonData && (
				<>
					<Info data={pokemonData} />
					<PokemonContainer image={pokemonData?.image!} />
				</>
			)}
		</div>
	);
};

export default Description;
