import { Pokemon } from '../../classes/pokemon'
import { JSX } from 'react';
import '../../styles/PokemonCard.css'
interface Props {
  pokemon: Pokemon;
}
export function PokemonCard({ pokemon }: Props): JSX.Element {
  const { name } = pokemon;
  return <section className="PokemonCard">
    <a href={"/pokemon/" + pokemon.name}>{name}</a>
  </section >
}