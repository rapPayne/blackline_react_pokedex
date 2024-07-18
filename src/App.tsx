import { About, Contact, FourOhFour } from './pages/OtherPages';
import PokedexRoot from './pages/PokedexRoot'
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { PokemonPage } from './pages/PokemonPage';
function App() {

  return (
    <>
      <header>
        <nav>
          <Link to="/">Pokedex</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
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
  )
}

export default App
