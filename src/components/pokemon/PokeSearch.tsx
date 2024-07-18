import { Dispatch, SetStateAction } from "react";

interface Props {
  fetchAllPokemon: () => void;
  searchString?: string;
  setSearchString: Dispatch<SetStateAction<string>>;
}
export const PokeSearch = ({ fetchAllPokemon, searchString, setSearchString }: Props) => {
  return (
    <>
      <div>
        <label htmlFor="searchString">Search</label>
        <input value={searchString}
          onChange={e => setSearchString(e.target.value)}
          id="searchString"
          autoComplete="off" />
        <button onClick={() => fetchAllPokemon()}>Fetch 'em all</button>
        <p>You're searching for '{searchString}'</p>
      </div>
    </>
  )
}

