import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
	const loginHandler = async () => {};

	return (
		<div className="login">
			<button className="login-btn" onClick={() => loginHandler()}>
				<FcGoogle />
				Login with Google
			</button>
		</div>
	);
};

export default Login;
