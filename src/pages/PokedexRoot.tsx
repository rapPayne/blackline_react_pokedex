import { useState } from 'react'
import { PokemonCard } from "../components/pokemon/PokemonCard";
import { PokeSearch } from "../components/pokemon/PokeSearch";
import '../styles/PokedexRoot.css';
import { useFetchPokemon } from '../hooks/useFetchPokemon';

const PokedexRoot = () => {
  const [searchString, setSearchString] = useState("")
  const { fetchAllPokemon, fetching, pokemons } = useFetchPokemon()

  console.log(pokemons)
  return <section className='PokedexRoot'>
    <h1>Pokedex</h1>
    <PokeSearch
      fetchAllPokemon={fetchAllPokemon}
      searchString={searchString}
      setSearchString={setSearchString} />
    {
      fetching ? <h1>LOADING, PLEASE WAIT</h1>
        :
        <section id="listWrapper">
          {pokemons.map((p, i) => <PokemonCard pokemon={p} key={i} />)}
        </section>
    }
  </section>
}

export default PokedexRoot