import { About, Contact, FourOhFour } from "./pages/OtherPages";
import PokedexRoot from "./pages/PokedexRoot";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { PokemonPage } from "./pages/PokemonPage";
import { useSelector } from "react-redux";
function App() {
  const selectedPokemon = useSelector(s => s.selectedPokemon)
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Pokedex</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
        </nav>
        <p>Current pokemon is {selectedPokemon?.name}</p>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/pokemon" />} />
        <Route path="/pokemon" element={<PokedexRoot />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
        <Route path="*" element={<FourOhFour />} />
      </Routes>

      <footer>
        Copyright &copy; Blackline, Inc. {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default App;
