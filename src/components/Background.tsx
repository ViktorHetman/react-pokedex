import React from "react";

import pokeball1 from "../assets/pokeball.png";
import pokeball2 from "../assets/pokeball2.png";

const Background: React.FC = () => {
	return (
		<div className="background">
			<img
				src={pokeball1}
				alt="background-pokeball1"
				className="pokeball pokeball1"
			/>
			<img
				src={pokeball2}
				alt="background-pokeball2"
				className="pokeball pokeball2"
			/>
			<img
				src={pokeball1}
				alt="background-pokeball1"
				className="pokeball pokeball3"
			/>
			<img
				src={pokeball2}
				alt="background-pokeball2"
				className="pokeball pokeball4"
			/>
			<img
				src={pokeball1}
				alt="background-pokeball1"
				className="pokeball pokeball5"
			/>
			<img
				src={pokeball2}
				alt="background-pokeball2"
				className="pokeball pokeball6"
			/>
		</div>
	);
};

export default Background;
