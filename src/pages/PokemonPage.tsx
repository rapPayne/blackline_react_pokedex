import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pokemon } from "../classes/PokemonRequest";
import '../styles/PokemonPage.css'

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
      // console.warn("PokemonPage is  being disposed of. Cleanup here.")
    }
  }, [])

  const { stats, types, baseExperience, sprites, weight } = pokemon;

  function showImages(sprites: object) {
    const images = [];
    for (const key in sprites) {
      if (typeof sprites[key] === "string")
        images.push({ label: key, imgSrc: sprites[key] })
      console.log(images)
    }
    return (
      <>
        {images.map((pi, i) => (
          <figure key={i}>
            <img src={pi.imgSrc} />
            <figcaption>{pi.label}</figcaption>
          </figure>
        ))}
      </>
    )
  }
  const showSprites = (sprites: object) => Object.entries(sprites).map((pi, i) => {
    if (typeof pi[1] === "string")
      return (
        <figure key={i}>
          <img src={pi[1]} />
          <figcaption>{pi[0]}</figcaption>
        </figure>
      )
  }
  );
  return (
    <>
      {/* <pre>{JSON.stringify(pokemon.sprites, null, 2)}</pre> */}
      <h1>Pokemon Page for {name}</h1>
      <section className="fullWidth">
        <section className="left">
          {sprites && showSprites(sprites)}
        </section>
        <section className="infoBox">
          <img src="" alt="" />
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
        </section>
      </section>

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
