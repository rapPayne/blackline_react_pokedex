import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pokemon } from "../classes/PokemonRequest";

export const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>({});

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(url)
      .then(res => res.json() as Pokemon)
      .then(p => setPokemon(p))
  }, [name])

  useEffect(() => {
    return () => {
      console.warn("PokemonPage is  being disposed of. Cleanup here.")
    }
  }, [])

  const { baseExperience, weight } = pokemon;
  return (
    <>
      <h1>Pokemon Page for {name}</h1>
      <p>Type: {type}</p>
      <p>HP: {hitPoints}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>Special Attack: {specialAttack}</p>
      <p>Special Defense: {specialDefense}</p>
      <p>Speed: {speed}</p>
      <p>Base experience: {baseExperience}</p>
      <p>Weight: {weight}</p>
    </>
  )
}
