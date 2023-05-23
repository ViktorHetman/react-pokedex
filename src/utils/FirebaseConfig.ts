import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDbIRWo3B5P-89vPaZRjezhM2ALputl8eM",
	authDomain: "react-pokedex-b95cb.firebaseapp.com",
	projectId: "react-pokedex-b95cb",
	storageBucket: "react-pokedex-b95cb.appspot.com",
	messagingSenderId: "640161489614",
	appId: "1:640161489614:web:d9c5508055089f3a06669f",
	measurementId: "G-MS049XBL2M",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
