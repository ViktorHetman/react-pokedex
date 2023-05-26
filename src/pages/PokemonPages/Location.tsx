import React from "react";
import { useAppSelector } from "../../redux/hooks";

const Location: React.FC = () => {
	const pokemonData = useAppSelector(
		({ pokemon: { currentPokemon } }) => currentPokemon,
	);
	return (
		<div className="pokemon-locations">
			<ul className="pokemon-locations-list">
				{pokemonData?.encounters.map((encounter: string) => (
					<li key={encounter} className="pokemon-location">
						{encounter}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Location;
