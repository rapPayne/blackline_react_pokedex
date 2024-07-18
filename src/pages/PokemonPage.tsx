import { useParams } from "react-router-dom";
export const PokemonPage = () => {
  const { name } = useParams();
  return (
    <>
      <h1>Pokemon Page for {name}</h1>
    </>
  )
}