import React from "react";

import Login from "../components/Login";

import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PokemonCard from "../components/PokemonCard";
import { getUserPokemons } from "../redux/pokemon/asyncActions";

const List: React.FC = () => {
	const { userInfo } = useAppSelector(({ app }) => app);
	const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(getUserPokemons());
	}, [userInfo, dispatch]);

	return (
		<div className="list">
			{userInfo ? <PokemonCard pokemons={userPokemons} /> : <Login />}
		</div>
	);
};

export default Wrapper(List);
