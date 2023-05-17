import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import pokebollIcon from "../assets/pokeball-icon.png";

const Navbar: React.FC = () => {
	return (
		<nav>
			<div className="block">
				<img src={pokebollIcon} alt="pokeboll-icon" />
			</div>
			<div className="data"></div>
			<div className="block">
				<GiHamburgerMenu />
			</div>
		</nav>
	);
};

export default Navbar;
