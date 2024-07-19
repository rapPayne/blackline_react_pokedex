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

  const { stats, types, baseExperience, weight } = pokemon;
  return (
    <>
      <h1>Pokemon Page for {name}</h1>
      <p>Types: </p>
      <ul>
      {types?.map((type, index) => (
        <li key={index} style={{ color: getColorForType(type.type?.name) }}>
          {type.type?.name}
          </li>
      ))}
      </ul>
      <p>Stats: </p>
      <ul>
      {stats?.map((stat, index) => (
        <li key={index}>{stat.stat?.name}: {stat.baseStat}</li>
      ))}
      </ul>
      <p>Base experience: {baseExperience}</p>
      <p>Weight: {weight}</p>
    </>
  )
}

function getColorForType(typeName) {
  const typeColors = {
    fire: 'red',
    water: 'blue',
    grass: 'green',
    electric: 'yellow',
    psychic: 'pink',
    poison: 'purple',
    // Add more types and colors as needed
  };
  return typeColors[typeName] || 'gray'; // Default color if type not found
}
