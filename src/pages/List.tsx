import React from "react";

import Login from "../components/Login";

import Wrapper from "../sections/Wrapper";
import { useAppSelector } from "../redux/hooks";

const List: React.FC = () => {
	const { userInfo } = useAppSelector(({ app }) => app);

	return (
		<div className="list">
			<Login />
		</div>
	);
};

export default Wrapper(List);
