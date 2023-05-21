import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

import Background from "./components/Background";

import Search from "./pages/Search";
import About from "./pages/About";
import Compare from "./pages/Compare";
import List from "./pages/List";

import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Pokemon from "./pages/Pokemon";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { clearToasts } from "./redux/app/slice";

import "./scss/index.scss";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
	const { toasts } = useAppSelector(({ app }) => app);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (toast.length) {
			const toastOptions: ToastOptions = {
				position: "bottom-right",
				autoClose: 2000,
				pauseOnHover: true,
				draggable: true,
				theme: "dark",
			};
			toasts.forEach((message: string) => {
				toast(message, toastOptions);
			});
			dispatch(clearToasts());
		}
	}, [toasts, dispatch]);

	return (
		<div className="main-container">
			<Background />
			<div className="app">
				<Navbar />
				<Routes>
					<Route path="/search" element={<Search />} />
					<Route path="/about" element={<About />} />
					<Route path="/compare" element={<Compare />} />
					<Route path="/list" element={<List />} />
					<Route path="/pokemon/:id" element={<Pokemon />} />
					<Route path="*" element={<Navigate to="/pokemon/1" />} />
				</Routes>
				<Footer />
				<ToastContainer />
			</div>
		</div>
	);
};

export default App;
