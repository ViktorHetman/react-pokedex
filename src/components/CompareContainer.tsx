import React from "react";
import { FaPlus } from "react-icons/fa";

import { UserPokemonType } from "../models/types";
import { pokemonTypeInterface } from "../redux/pokemon/types";

const CompareContainer = ({
	pokemon = undefined,
	isEmpty = false,
}: {
	pokemon?: UserPokemonType;
	isEmpty?: boolean;
}) => {
	const getStats = () => {};

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
							{/* {getStats()} */}
						</div>
					</div>
					<div className="compare-action-buttons">
						<button className="compare-btn">Add</button>
						<button className="view-btn">View</button>
						<button className="remove-btn">Remove</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompareContainer;
