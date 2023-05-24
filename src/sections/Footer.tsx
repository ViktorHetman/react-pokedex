import React from "react";
import { signOut } from "firebase/auth";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

import { firebaseAuth } from "../utils/FirebaseConfig";
import { useAppDispatch } from "../redux/hooks";
import { setToasts, setUserStatus } from "../redux/app/slice";

const Footer: React.FC = () => {
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		signOut(firebaseAuth);
		dispatch(setUserStatus(undefined));
		dispatch(setToasts("Logged out successfully"));
	};

	return (
		<footer>
			<div className="block"></div>
			<div className="data"></div>
			<div className="block">
				<MdOutlinePowerSettingsNew onClick={() => logoutHandler()} />
			</div>
		</footer>
	);
};

export default Footer;
