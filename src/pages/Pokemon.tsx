import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { extractColors } from "extract-colors";

import Wrapper from "../sections/Wrapper";
import Description from "./PokemonPages/Description";
import CapableMoves from "./PokemonPages/CapableMoves";
import Evolution from "./PokemonPages/Evolution";
import Location from "./PokemonPages/Location";

import { defaultImages, images } from "../utils/getPokemonImages";
import {
	pokemonRoute,
	pokemonSpeciesRoute,
	pokemonTabs,
} from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentPokemon } from "../redux/pokemon/slice";

const Pokemon: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { currentPokemonTab } = useAppSelector(({ app }) => app);

	const getRecursiveEvolution: any = React.useCallback(
		(evolutionChain: any, level: number, evolutionData: any) => {
			if (!evolutionChain.evolves_to.length) {
				return evolutionData.push({
					pokemon: {
						...evolutionChain.species,
						url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
					},
					level,
				});
			}
			evolutionData.push({
				pokemon: {
					...evolutionChain.species,
					url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
				},
				level,
			});
			return getRecursiveEvolution(
				evolutionChain.evolves_to[0],
				level + 1,
				evolutionData,
			);
		},
		[],
	);

	const getEvolutionData = React.useCallback(
		(evolutionChain: any) => {
			const evolutionData: any[] = [];
			getRecursiveEvolution(evolutionChain, 1, evolutionData);
			return evolutionData;
		},
		[getRecursiveEvolution],
	);

	const getPokemonInfo = React.useCallback(
		async (image: string) => {
			const { data } = await axios.get(`${pokemonRoute}/${params.id}`);
			const { data: dataEncounters } = await axios.get(
				data.location_area_encounters,
			);
			const {
				data: {
					evolution_chain: { url: evolutionURL },
				},
			} = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
			const { data: evolutionData } = await axios.get(evolutionURL);

			const encounters: string[] = [];
			dataEncounters.forEach((encounter: any) => {
				encounters.push(
					encounter.location_area.name.toUpperCase().split("-").join(" "),
				);
			});
			const pokemonAbilities: { abilities: string[]; moves: string[] } = {
				abilities: data.abilities.map(
					({ ability }: { ability: { name: string } }) => ability.name,
				),
				moves: data.moves.map(({ move }: { move: { name: string } }) => move.name),
			};
			const evolution = getEvolutionData(evolutionData.chain);
			const evolutionLevel = evolution.find(
				({ pokemon }) => pokemon.name === data.name,
			).level;
			dispatch(
				setCurrentPokemon({
					id: data.id,
					name: data.name,
					types: data.types.map(
						({ type: { name } }: { type: { name: string } }) => name,
					),
					image,
					stats: data.stats.map(
						({ stat, base_stat }: { stat: { name: string }; base_stat: number }) => ({
							name: stat.name,
							value: base_stat,
						}),
					),
					encounters,
					evolutionLevel,
					evolution,
					pokemonAbilities,
				}),
			);
		},
		[getEvolutionData, params.id, dispatch],
	);

	React.useEffect(() => {
		const imageElemet = document.createElement("img");
		// @ts-ignore
		imageElemet.src = images[params.id];
		if (!imageElemet.src) {
			// @ts-ignore
			imageElemet.src = defaultImages[params.id];
		}

		const options = {
			pixels: 10000,
			distance: 1,
			splitPower: 10,
			colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
				alpha > 250,
			saturationDistance: 0.2,
			lightnessDistance: 0.2,
			hueDistance: 0.083333333,
		};

		const getColor = async () => {
			const color = await extractColors(imageElemet.src, options);
			const root = document.documentElement;
			root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
		};
		getColor();

		getPokemonInfo(imageElemet.src);
	}, [params, getPokemonInfo]);

	return (
		<>
			<div>{currentPokemonTab === pokemonTabs.description && <Description />}</div>
			<div>{currentPokemonTab === pokemonTabs.evolution && <Evolution />}</div>
			<div>{currentPokemonTab === pokemonTabs.locations && <Location />}</div>
			<div>{currentPokemonTab === pokemonTabs.moves && <CapableMoves />}</div>
		</>
	);
};

export default Wrapper(Pokemon);
