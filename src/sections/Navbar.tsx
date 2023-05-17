import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

import pokebollIcon from "../assets/pokeball-icon.png";
import { navigationRoutes } from "../utils/routes";

const Navbar: React.FC = () => {
	return (
		<nav>
			<div className="block">
				<img src={pokebollIcon} alt="pokeboll-icon" />
			</div>
			<div className="data">
				<ul>
					{navigationRoutes.map(({ name, route }, idx) => (
						<Link to={route} key={idx}>
							<li>{name}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className="block">
				<GiHamburgerMenu />
			</div>
		</nav>
	);
};

export default Navbar;
