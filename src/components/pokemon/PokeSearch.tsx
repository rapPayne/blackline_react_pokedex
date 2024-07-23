import { Dispatch, SetStateAction } from "react";

interface Props {
  searchString?: string;
  setSearchString: Dispatch<SetStateAction<string>>;
}
export const PokeSearch = ({ searchString, setSearchString }: Props) => {
  return (
    <>
      <div>
        <label htmlFor="searchString">Search</label>
        <input value={searchString}
          onChange={e => setSearchString(e.target.value)}
          id="searchString"
          autoComplete="off" />
        <p>You're searching for '{searchString}'</p>
      </div>
    </>
  )
}

