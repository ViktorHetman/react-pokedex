import React from "react";
import { signOut } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

import { firebaseAuth } from "../utils/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPokemonTab, setToasts, setUserStatus } from "../redux/app/slice";
import { routes } from "../utils/footerRoutes";

const Footer: React.FC = () => {
	const dispatch = useAppDispatch();
	const { currentPokemonTab } = useAppSelector(({ app }) => app);
	const location = useLocation();
	const logoutHandler = () => {
		signOut(firebaseAuth);
		dispatch(setUserStatus(undefined));
		dispatch(setToasts("Logged out successfully"));
	};

	return (
		<footer>
			<div className="block"></div>
			<div className="data">
				{location.pathname.includes("/pokemon") && (
					<ul>
						{routes.map((route) => {
							return (
								<li
									key={route.name}
									className={`${currentPokemonTab === route.name ? "active" : ""}`}
									onClick={() => {
										dispatch(setPokemonTab(route.name));
									}}
								>
									{route.value}
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<div className="block">
				<MdOutlinePowerSettingsNew onClick={() => logoutHandler()} />
			</div>
		</footer>
	);
};

export default Footer;
