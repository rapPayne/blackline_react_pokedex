/* eslint-disable @typescript-eslint/no-explicit-any */
// To parse this data:
//
//   import { Convert, PokemonRequest } from "./file";
//
//   const pokemonRequest = Convert.toPokemonRequest(json);

export type Pokemon = {
  abilities?: Ability[];
  baseExperience?: number;
  cries?: Cries;
  forms?: Species[];
  gameIndices?: GameIndex[];
  height?: number;
  heldItems?: HeldItem[];
  id?: number;
  isDefault?: boolean;
  locationAreaEncounters?: string;
  moves?: Move[];
  name?: string;
  order?: number;
  pastAbilities?: any[];
  pastTypes?: any[];
  species?: Species;
  sprites?: Sprites;
  stats?: Stat[];
  types?: Type[];
  weight?: number;
}

export type Ability = {
  ability?: Species;
  isHidden?: boolean;
  slot?: number;
}

export type Species = {
  name?: string;
  url?: string;
}

export type Cries = {
  latest?: string;
  legacy?: string;
}

export type GameIndex = {
  gameIndex?: number;
  version?: Species;
}

export type HeldItem = {
  item?: Species;
  versionDetails?: VersionDetail[];
}

export type VersionDetail = {
  rarity?: number;
  version?: Species;
}

export type Move = {
  move?: Species;
  versionGroupDetails?: VersionGroupDetail[];
}

export type VersionGroupDetail = {
  levelLearnedAt?: number;
  moveLearnMethod?: Species;
  versionGroup?: Species;
}

export type GenerationV = {
  blackWhite?: Sprites;
}

export type GenerationIv = {
  diamondPearl?: Sprites;
  heartgoldSoulsilver?: Sprites;
  platinum?: Sprites;
}

export type Versions = {
  generationI?: GenerationI;
  generationIi?: GenerationIi;
  generationIii?: GenerationIii;
  generationIv?: GenerationIv;
  generationV?: GenerationV;
  generationVi?: { [key: string]: Home };
  generationVii?: GenerationVii;
  generationViii?: GenerationViii;
}

export type Other = {
  dreamWorld?: DreamWorld;
  home?: Home;
  officialArtwork?: OfficialArtwork;
  showdown?: Sprites;
}

export type Sprites = {
  backDefault?: string;
  backFemale?: string;
  backShiny?: string;
  backShinyFemale?: null | string;
  frontDefault?: string;
  frontFemale?: string;
  frontShiny?: string;
  frontShinyFemale?: string;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export type GenerationI = {
  redBlue?: RedBlue;
  yellow?: RedBlue;
}

export type RedBlue = {
  backDefault?: string;
  backGray?: string;
  backTransparent?: string;
  frontDefault?: string;
  frontGray?: string;
  frontTransparent?: string;
}

export type GenerationIi = {
  crystal?: Crystal;
  gold?: Gold;
  silver?: Gold;
}

export type Crystal = {
  backDefault?: string;
  backShiny?: string;
  backShinyTransparent?: string;
  backTransparent?: string;
  frontDefault?: string;
  frontShiny?: string;
  frontShinyTransparent?: string;
  frontTransparent?: string;
}

export type Gold = {
  backDefault?: string;
  backShiny?: string;
  frontDefault?: string;
  frontShiny?: string;
  frontTransparent?: string;
}

export type GenerationIii = {
  emerald?: OfficialArtwork;
  fireredLeafgreen?: Gold;
  rubySapphire?: Gold;
}

export type OfficialArtwork = {
  frontDefault?: string;
  frontShiny?: string;
}

export type Home = {
  frontDefault?: string;
  frontFemale?: string;
  frontShiny?: string;
  frontShinyFemale?: string;
}

export type GenerationVii = {
  icons?: DreamWorld;
  ultraSunUltraMoon?: Home;
}

export type DreamWorld = {
  frontDefault?: string;
  frontFemale?: null | string;
}

export type GenerationViii = {
  icons?: DreamWorld;
}

export type Stat = {
  baseStat?: number;
  effort?: number;
  stat?: Species;
}

export type Type = {
  slot?: number;
  type?: Species;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPokemonRequest(json: string): Pokemon {
    return JSON.parse(json);
  }

  public static pokemonRequestToJson(value: Pokemon): string {
    return JSON.stringify(value);
  }
}
