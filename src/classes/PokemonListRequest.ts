// To parse this data:
//
//   import { Convert, PokemonListRequest } from "./file";
//
//   const pokemonListRequest = Convert.toPokemonListRequest(json);

export type PokemonListRequest = {
  count?: number;
  next?: string;
  previous?: null;
  results?: Result[];
}

export type Result = {
  name: string;
  url: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPokemonListRequest(json: string): PokemonListRequest {
    return JSON.parse(json);
  }

  public static pokemonListRequestToJson(value: PokemonListRequest): string {
    return JSON.stringify(value);
  }
}
