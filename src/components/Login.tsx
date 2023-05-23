import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

import { firebaseAuth, usersRef } from "../utils/FirebaseConfig";
import { setUserStatus } from "../redux/app/slice";
import { useAppDispatch } from "../redux/hooks";

const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const loginHandler = async () => {
		const provider = new GoogleAuthProvider();
		const {
			user: { email, uid },
		} = await signInWithPopup(firebaseAuth, provider);
		if (email) {
			const firestoreQuery = query(usersRef, where("uid", "==", uid));
			const fetchedUser = await getDocs(firestoreQuery);
			if (fetchedUser.docs.length === 0) {
				await addDoc(usersRef, { uid, email });
			}
			dispatch(setUserStatus({ email }));
		}
	};

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
