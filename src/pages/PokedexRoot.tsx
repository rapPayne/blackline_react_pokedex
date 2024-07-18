import { useState } from 'react'
import { PokemonCard } from "../components/pokemon/PokemonCard";
import { PokeSearch } from "../components/pokemon/PokeSearch";
import '../styles/PokedexRoot.css';
import { PokemonListRequest, Result } from '../classes/PokemonListRequest';

const PokedexRoot = () => {
  const [searchString, setSearchString] = useState("")
  const [pokemon, setPokemon] = useState([])
  console.log(pokemon)
  return <section className='PokedexRoot'>
    <h1>Pokedex</h1>
    <PokeSearch
      fetchAllPokemon={fetchAllPokemon}
      searchString={searchString}
      setSearchString={setSearchString} />
    <section id="listWrapper">
      {pokemon.map((p, i) => <PokemonCard pokemon={p} key={i} />)}
    </section>
  </section>

  function fetchAllPokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1500`;
    fetch(url)
      .then(res => res.json() as PokemonListRequest)
      .then(res => res.results)
      // .then(rawList => rawList.map((p: any) => {
      //   const id = p.url.match(/\/v2\/pokemon\/(\d+)\//)[1]
      //   return { ...p, id: +id }
      // }))
      .then(rawList => rawList!.map((p: Result) => ({ ...p, id: +p.url.match(/\/v2\/pokemon\/(\d+)\//)[1] })))
      .then(allThePokemons => setPokemon(allThePokemons))
  }
}

export default PokedexRoot