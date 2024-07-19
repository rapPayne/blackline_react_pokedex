import { useCallback, useState } from 'react';
import { PokemonListRequest, Result } from '../classes/PokemonListRequest';
import { Pokemon } from '../classes/PokemonRequest';

const baseUrl = `https://pokeapi.co/api/v2`

export function useFetchPokemon() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemon, setPokemon] = useState<Pokemon>({})

  const fetchAllPokemon = useCallback(() => {
    setFetching(true)
    const url = `${baseUrl}/pokemon?limit=1500`;
    fetch(url)
      .then(res => res.json() as PokemonListRequest)
      .then(res => res.results)
      .then(rawList => rawList!.map((p: Result) => ({ ...p, id: +p.url.match(/\/v2\/pokemon\/(\d+)\//)[1] })))
      .then(allThePokemons => setPokemons(allThePokemons))
      .then(() => setFetching(false))
  }, [])

  const fetchOnePokemon = useCallback((id: string | number) => {
    setFetching(true)
    const url = `${baseUrl}/pokemon/${id}`;
    fetch(url)
      .then(res => res.json() as Pokemon)
      .then(p => setPokemon(p))
      .then(() => setFetching(false))
  }, [])

  return {
    fetchAllPokemon,
    fetchOnePokemon,
    pokemons,
    pokemon,
    fetching,
  }
}

