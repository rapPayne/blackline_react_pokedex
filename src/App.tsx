import { About, Contact, FourOhFour } from "./pages/OtherPages";
import PokedexRoot from "./pages/PokedexRoot";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { PokemonPage } from "./pages/PokemonPage";
function App() {
	return (
		<>
			<header>
				<nav>
					<NavLink to="/">Pokedex</NavLink>
					<NavLink to="/about">About us</NavLink>
					<NavLink to="/contact">Contact us</NavLink>
				</nav>
			</header>

			<Routes>
				<Route path="/" element={<PokedexRoot />} />
				<Route path="/pokemons" element={<Navigate to="/" />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/pokemon/:name" element={<PokemonPage />} />
				<Route path="*" element={<FourOhFour />} />
			</Routes>

			<footer>
				Copyright &copy; Blackline, Inc. {new Date().getFullYear()}
			</footer>
		</>
	);
}

export default App;
