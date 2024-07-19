import { useState } from 'react';
import { PokemonListRequest, Result } from '../classes/PokemonListRequest';
import { Pokemon } from '../classes/PokemonRequest';

export function useFetchPokemon() {
  const [fetching, setFetching] = useState(false);
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState([])

  const fetchAllPokemon = () => {
    setFetching(true)
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1500`;
    fetch(url)
      .then(res => res.json() as PokemonListRequest)
      .then(res => res.results)
      .then(rawList => rawList!.map((p: Result) => ({ ...p, id: +p.url.match(/\/v2\/pokemon\/(\d+)\//)[1] })))
      .then(allThePokemons => setPokemons(allThePokemons))
      .then(() => setFetching(false))
  }

  const fetchOnePokemon = (id) => {
    setFetching(true)
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
      .then(res => res.json() as Pokemon)
      .then(p => setPokemon(p))
      .then(() => setFetching(false))
  }
  return {
    fetchAllPokemon,
    fetchOnePokemon,
    pokemons,
    pokemon,
    fetching,
  }
}

