import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Background from "./components/Background";

import Search from "./pages/Search";
import About from "./pages/About";
import Compare from "./pages/Compare";
import List from "./pages/List";

import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Pokemon from "./pages/Pokemon";

import "./scss/index.scss";

const App: React.FC = () => {
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
			</div>
		</div>
	);
};

export default App;
