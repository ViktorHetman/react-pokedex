import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
	PokemonStatType,
	PokemonStats,
	UserPokemonType,
} from "../models/types";
import { pokemonTypeInterface } from "../redux/pokemon/types";
import { pokemonTypes } from "../utils/pokemonTypes";
import { useAppDispatch } from "../redux/hooks";
import { removeFromCompare } from "../redux/pokemon/slice";
import { addPokemonToList } from "../redux/pokemon/asyncActions";

const CompareContainer = ({
	pokemon = undefined,
	isEmpty = false,
}: {
	pokemon?: UserPokemonType;
	isEmpty?: boolean;
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const createStatsArray = (
		types: pokemonTypeInterface[],
		statType: PokemonStatType,
	) => {
		const statsArray: { name: string; image: string }[] = [];
		const statsSet = new Set<string[]>();
		types.forEach((type: pokemonTypeInterface) => {
			const keys = Object.keys(type)[0];
			type[keys][statType].forEach((stat: string) => {
				// @ts-expect-error
				if (!statsSet.has(stat)) {
					// @ts-expect-error
					statsArray.push({ name: stat, image: pokemonTypes[stat].image });
					// @ts-expect-error
					statsSet.add(stat);
				}
			});
		});
		return statsArray;
	};

	const getStats = () => {
		return (
			<>
				<div className="pokemon-types">
					<h4 className="pokemon-type-title">Strength</h4>
					<div className="pokemon-type-icons">
						{createStatsArray(pokemon?.types!, PokemonStats.STRENGTH).map(
							(stat: { image: string }) => (
								<div className="pokemon-type">
									<img
										className="pokemon-type-image"
										src={stat.image}
										alt="pokemon type"
									/>
								</div>
							),
						)}
					</div>
				</div>
				<div className="pokemon-types">
					<h4 className="pokemon-type-title">Resistance</h4>
					<div className="pokemon-type-icons">
						{createStatsArray(pokemon?.types!, PokemonStats.RESISTANCE).map(
							(stat: { image: string }) => (
								<div className="pokemon-type">
									<img
										className="pokemon-type-image"
										src={stat.image}
										alt="pokemon type"
									/>
								</div>
							),
						)}
					</div>
				</div>
				<div className="pokemon-types">
					<h4 className="pokemon-type-title">Vulnerable</h4>
					<div className="pokemon-type-icons">
						{createStatsArray(pokemon?.types!, PokemonStats.VULNERABLE).map(
							(stat: { image: string }) => (
								<div className="pokemon-type">
									<img
										className="pokemon-type-image"
										src={stat.image}
										alt="pokemon type"
									/>
								</div>
							),
						)}
					</div>
				</div>
				<div className="pokemon-types">
					<h4 className="pokemon-type-title">Weakness</h4>
					<div className="pokemon-type-icons">
						{createStatsArray(pokemon?.types!, PokemonStats.WEAKNESS).map(
							(stat: { image: string }) => (
								<div className="pokemon-type">
									<img
										className="pokemon-type-image"
										src={stat.image}
										alt="pokemon type"
									/>
								</div>
							),
						)}
					</div>
				</div>
			</>
		);
	};

	return (
		<div className="compare-container">
			{isEmpty && (
				<div className="empty">
					<button>
						<FaPlus />
					</button>
					<h3>Add pokemon to comparison</h3>
				</div>
			)}
			{pokemon && (
				<div className="compare-element">
					<div className="compare-info">
						<div className="compare-details">
							<h3>{pokemon.name}</h3>
							<img className="compare-image" src={pokemon.image} alt="pokemon" />
						</div>
						<div className="pokemon-types-container">
							<div className="pokemon-types">
								<h4 className="pokemon-type-title">Type</h4>
								<div className="pokemon-type-icons">
									{pokemon?.types.map((type: pokemonTypeInterface, idx: number) => {
										const keys = Object.keys(type);
										return (
											<div key={idx} className="pokemon-type">
												<img
													className="pokemon-type-image"
													src={type[keys[0]].image}
													alt="pokemon type"
												/>
											</div>
										);
									})}
								</div>
							</div>
							{getStats()}
						</div>
					</div>
					<div className="compare-action-buttons">
						<button
							className="compare-btn"
							onClick={() => dispatch(addPokemonToList(pokemon))}
						>
							Add
						</button>
						<button
							className="view-btn"
							onClick={() => navigate(`/pokemon/${pokemon.id}`)}
						>
							View
						</button>
						<button
							className="remove-btn"
							onClick={() => dispatch(removeFromCompare({ id: pokemon.id }))}
						>
							Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompareContainer;
