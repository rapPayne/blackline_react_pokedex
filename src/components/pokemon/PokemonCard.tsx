import { Pokemon } from '../../classes/pokemon'
import { JSX } from 'react';
import '../../styles/PokemonCard.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAPokemon } from '../../store/actions';
interface Props {
  pokemon: Pokemon;
}
export function PokemonCard({ pokemon }: Props): JSX.Element {
  const dispatch = useDispatch();
  const { name } = pokemon;
  return <section className="PokemonCard">
    <Link onClick={() => dispatch(selectAPokemon(pokemon))} to={"/pokemon/" + pokemon.name}>{name}</Link>
  </section >
}