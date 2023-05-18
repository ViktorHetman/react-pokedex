import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

import pokebollIcon from "../assets/pokeball-icon.png";
import { navigationRoutes } from "../utils/routes";

const Navbar: React.FC = () => {
	const location = useLocation();
	React.useEffect(() => {
		const index = navigationRoutes.findIndex(({ route }) =>
			location.pathname.includes(route),
		);
		sliderHandler(index);
	}, [location.pathname]);

	const sliderHandler = (idx: number) => {
		const underlines = document.querySelectorAll<HTMLElement>(".underline");
		for (let i = 0; i < underlines.length; i++) {
			underlines[i].style.transform = "translate3d(" + idx * 100 + "%,0,0)";
		}
	};

	return (
		<nav>
			<div className="block">
				<img src={pokebollIcon} alt="pokeboll-icon" />
			</div>
			<div className="data">
				<ul>
					<div className="underline"></div>
					<div className="underline"></div>
					<div className="underline"></div>
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
