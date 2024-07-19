import { Pokemon } from '../../classes/pokemon'
import { JSX } from 'react';
import '../../styles/PokemonCard.css'
import { Link } from 'react-router-dom';
interface Props {
  pokemon: Pokemon;
}
export function PokemonCard({ pokemon }: Props): JSX.Element {
  const { name } = pokemon;
  return <section className="PokemonCard">
    <Link to={"/pokemon/" + pokemon.name}>{name}</Link>
  </section >
}