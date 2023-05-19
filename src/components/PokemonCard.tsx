import React from "react";
import { IoGitCompare } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { UserPokemonType } from "../models/types";
import { pokemonTypeInterface } from "../redux/pokemon/types";

const PokemonCard: React.FC<{ pokemons: UserPokemonType[] }> = ({
	pokemons,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div className="pokemon-card-container">
			<div className="pokemon-card-grid">
				{pokemons &&
					pokemons.length > 0 &&
					pokemons?.map((pokemon: UserPokemonType) => {
						return (
							<div key={pokemon.id} className="pokemon-card">
								<div className="pokemon-card-list">
									{location.pathname.includes("/pokemon") ||
									location.pathname.includes("/search") ? (
										<FaPlus className="plus" />
									) : (
										<FaTrash className="trash" />
									)}
								</div>
								<div className="pokemon-card-compare">
									<IoGitCompare />
								</div>
								<h3 className="pokemon-card-title">{pokemon.name}</h3>
								<img
									src={pokemon.image}
									alt="pokemon"
									className="pokemon-card-image"
									loading="lazy"
									onClick={() => navigate(`/pokemon/${pokemon.id}`)}
								/>
								<div className="pokemon-card-types">
									{pokemon.types.map(
										(type: pokemonTypeInterface, idx: number) => {
											const keys = Object.keys(type);
											return (
												<div className="pokemon-card-certain-type" key={idx}>
													<img
														src={type[keys[0]].image}
														alt="pokemon-type"
														className="pokemon-card-type-image"
														loading="lazy"
													/>
													<h6 className="pokemon-card-type-text">{keys[0]}</h6>
												</div>
											);
										},
									)}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default PokemonCard;
