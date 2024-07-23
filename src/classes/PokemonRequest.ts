// To parse this data:
//
//   import { Convert, PokemonRequest } from "./file";
//
//   const pokemonRequest = Convert.toPokemonRequest(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type PokemonRequest = {
  abilities?:              Ability[];
  baseExperience?:         number;
  cries?:                  Cries;
  forms?:                  Species[];
  gameIndices?:            GameIndex[];
  height?:                 number;
  heldItems?:              HeldItem[];
  id?:                     number;
  isDefault?:              boolean;
  locationAreaEncounters?: string;
  moves?:                  Move[];
  name?:                   string;
  order?:                  number;
  pastAbilities?:          any[];
  pastTypes?:              PastType[];
  species?:                Species;
  sprites?:                Sprites;
  stats?:                  Stat[];
  types?:                  Type[];
  weight?:                 number;
}

export type Ability = {
  ability?:  Species;
  isHidden?: boolean;
  slot?:     number;
}

export type Species = {
  name?: string;
  url?:  string;
}

export type Cries = {
  latest?: string;
  legacy?: string;
}

export type GameIndex = {
  gameIndex?: number;
  version?:   Species;
}

export type HeldItem = {
  item?:           Species;
  versionDetails?: VersionDetail[];
}

export type VersionDetail = {
  rarity?:  number;
  version?: Species;
}

export type Move = {
  move?:                Species;
  versionGroupDetails?: VersionGroupDetail[];
}

export type VersionGroupDetail = {
  levelLearnedAt?:  number;
  moveLearnMethod?: Species;
  versionGroup?:    Species;
}

export type PastType = {
  generation?: Species;
  types?:      Type[];
}

export type Type = {
  slot?: number;
  type?: Species;
}

export type GenerationV = {
  blackWhite?: Sprites;
}

export type GenerationIv = {
  diamondPearl?:        Sprites;
  heartgoldSoulsilver?: Sprites;
  platinum?:            Sprites;
}

export type Versions = {
  generationI?:    GenerationI;
  generationIi?:   GenerationIi;
  generationIii?:  GenerationIii;
  generationIv?:   GenerationIv;
  generationV?:    GenerationV;
  generationVi?:   { [key: string]: Home };
  generationVii?:  GenerationVii;
  generationViii?: GenerationViii;
}

export type Other = {
  dreamWorld?:      DreamWorld;
  home?:            Home;
  officialArtwork?: OfficialArtwork;
  showdown?:        Sprites;
}

export type Sprites = {
  backDefault?:      string;
  backFemale?:       null;
  backShiny?:        string;
  backShinyFemale?:  null;
  frontDefault?:     string;
  frontFemale?:      null;
  frontShiny?:       string;
  frontShinyFemale?: null;
  other?:            Other;
  versions?:         Versions;
  animated?:         Sprites;
}

export type GenerationI = {
  redBlue?: RedBlue;
  yellow?:  RedBlue;
}

export type RedBlue = {
  backDefault?:      string;
  backGray?:         string;
  backTransparent?:  string;
  frontDefault?:     string;
  frontGray?:        string;
  frontTransparent?: string;
}

export type GenerationIi = {
  crystal?: Crystal;
  gold?:    Gold;
  silver?:  Gold;
}

export type Crystal = {
  backDefault?:           string;
  backShiny?:             string;
  backShinyTransparent?:  string;
  backTransparent?:       string;
  frontDefault?:          string;
  frontShiny?:            string;
  frontShinyTransparent?: string;
  frontTransparent?:      string;
}

export type Gold = {
  backDefault?:      string;
  backShiny?:        string;
  frontDefault?:     string;
  frontShiny?:       string;
  frontTransparent?: string;
}

export type GenerationIii = {
  emerald?:          OfficialArtwork;
  fireredLeafgreen?: Gold;
  rubySapphire?:     Gold;
}

export type OfficialArtwork = {
  frontDefault?: string;
  frontShiny?:   string;
}

export type Home = {
  frontDefault?:     string;
  frontFemale?:      null;
  frontShiny?:       string;
  frontShinyFemale?: null;
}

export type GenerationVii = {
  icons?:             DreamWorld;
  ultraSunUltraMoon?: Home;
}

export type DreamWorld = {
  frontDefault?: string;
  frontFemale?:  null;
}

export type GenerationViii = {
  icons?: DreamWorld;
}

export type Stat = {
  baseStat?: number;
  effort?:   number;
  stat?:     Species;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toPokemonRequest(json: string): PokemonRequest {
      return cast(JSON.parse(json), r("PokemonRequest"));
  }

  public static pokemonRequestToJson(value: PokemonRequest): string {
      return JSON.stringify(uncast(value, r("PokemonRequest")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
      if (typ.length === 2 && typ[0] === undefined) {
          return `an optional ${prettyTypeName(typ[1])}`;
      } else {
          return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
      }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
      return typ.literal;
  } else {
      return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue(l("Date"), val, key, parent);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue(l(ref || "object"), val, key, parent);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps, key, ref);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps, key, ref);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
      ref = typ.ref;
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "PokemonRequest": o([
      { json: "abilities", js: "abilities", typ: u(undefined, a(r("Ability"))) },
      { json: "base_experience", js: "baseExperience", typ: u(undefined, 0) },
      { json: "cries", js: "cries", typ: u(undefined, r("Cries")) },
      { json: "forms", js: "forms", typ: u(undefined, a(r("Species"))) },
      { json: "game_indices", js: "gameIndices", typ: u(undefined, a(r("GameIndex"))) },
      { json: "height", js: "height", typ: u(undefined, 0) },
      { json: "held_items", js: "heldItems", typ: u(undefined, a(r("HeldItem"))) },
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "is_default", js: "isDefault", typ: u(undefined, true) },
      { json: "location_area_encounters", js: "locationAreaEncounters", typ: u(undefined, "") },
      { json: "moves", js: "moves", typ: u(undefined, a(r("Move"))) },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "order", js: "order", typ: u(undefined, 0) },
      { json: "past_abilities", js: "pastAbilities", typ: u(undefined, a("any")) },
      { json: "past_types", js: "pastTypes", typ: u(undefined, a(r("PastType"))) },
      { json: "species", js: "species", typ: u(undefined, r("Species")) },
      { json: "sprites", js: "sprites", typ: u(undefined, r("Sprites")) },
      { json: "stats", js: "stats", typ: u(undefined, a(r("Stat"))) },
      { json: "types", js: "types", typ: u(undefined, a(r("Type"))) },
      { json: "weight", js: "weight", typ: u(undefined, 0) },
  ], false),
  "Ability": o([
      { json: "ability", js: "ability", typ: u(undefined, r("Species")) },
      { json: "is_hidden", js: "isHidden", typ: u(undefined, true) },
      { json: "slot", js: "slot", typ: u(undefined, 0) },
  ], false),
  "Species": o([
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "url", js: "url", typ: u(undefined, "") },
  ], false),
  "Cries": o([
      { json: "latest", js: "latest", typ: u(undefined, "") },
      { json: "legacy", js: "legacy", typ: u(undefined, "") },
  ], false),
  "GameIndex": o([
      { json: "game_index", js: "gameIndex", typ: u(undefined, 0) },
      { json: "version", js: "version", typ: u(undefined, r("Species")) },
  ], false),
  "HeldItem": o([
      { json: "item", js: "item", typ: u(undefined, r("Species")) },
      { json: "version_details", js: "versionDetails", typ: u(undefined, a(r("VersionDetail"))) },
  ], false),
  "VersionDetail": o([
      { json: "rarity", js: "rarity", typ: u(undefined, 0) },
      { json: "version", js: "version", typ: u(undefined, r("Species")) },
  ], false),
  "Move": o([
      { json: "move", js: "move", typ: u(undefined, r("Species")) },
      { json: "version_group_details", js: "versionGroupDetails", typ: u(undefined, a(r("VersionGroupDetail"))) },
  ], false),
  "VersionGroupDetail": o([
      { json: "level_learned_at", js: "levelLearnedAt", typ: u(undefined, 0) },
      { json: "move_learn_method", js: "moveLearnMethod", typ: u(undefined, r("Species")) },
      { json: "version_group", js: "versionGroup", typ: u(undefined, r("Species")) },
  ], false),
  "PastType": o([
      { json: "generation", js: "generation", typ: u(undefined, r("Species")) },
      { json: "types", js: "types", typ: u(undefined, a(r("Type"))) },
  ], false),
  "Type": o([
      { json: "slot", js: "slot", typ: u(undefined, 0) },
      { json: "type", js: "type", typ: u(undefined, r("Species")) },
  ], false),
  "GenerationV": o([
      { json: "black-white", js: "blackWhite", typ: u(undefined, r("Sprites")) },
  ], false),
  "GenerationIv": o([
      { json: "diamond-pearl", js: "diamondPearl", typ: u(undefined, r("Sprites")) },
      { json: "heartgold-soulsilver", js: "heartgoldSoulsilver", typ: u(undefined, r("Sprites")) },
      { json: "platinum", js: "platinum", typ: u(undefined, r("Sprites")) },
  ], false),
  "Versions": o([
      { json: "generation-i", js: "generationI", typ: u(undefined, r("GenerationI")) },
      { json: "generation-ii", js: "generationIi", typ: u(undefined, r("GenerationIi")) },
      { json: "generation-iii", js: "generationIii", typ: u(undefined, r("GenerationIii")) },
      { json: "generation-iv", js: "generationIv", typ: u(undefined, r("GenerationIv")) },
      { json: "generation-v", js: "generationV", typ: u(undefined, r("GenerationV")) },
      { json: "generation-vi", js: "generationVi", typ: u(undefined, m(r("Home"))) },
      { json: "generation-vii", js: "generationVii", typ: u(undefined, r("GenerationVii")) },
      { json: "generation-viii", js: "generationViii", typ: u(undefined, r("GenerationViii")) },
  ], false),
  "Other": o([
      { json: "dream_world", js: "dreamWorld", typ: u(undefined, r("DreamWorld")) },
      { json: "home", js: "home", typ: u(undefined, r("Home")) },
      { json: "official-artwork", js: "officialArtwork", typ: u(undefined, r("OfficialArtwork")) },
      { json: "showdown", js: "showdown", typ: u(undefined, r("Sprites")) },
  ], false),
  "Sprites": o([
      { json: "back_default", js: "backDefault", typ: u(undefined, "") },
      { json: "back_female", js: "backFemale", typ: u(undefined, null) },
      { json: "back_shiny", js: "backShiny", typ: u(undefined, "") },
      { json: "back_shiny_female", js: "backShinyFemale", typ: u(undefined, null) },
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_female", js: "frontFemale", typ: u(undefined, null) },
      { json: "front_shiny", js: "frontShiny", typ: u(undefined, "") },
      { json: "front_shiny_female", js: "frontShinyFemale", typ: u(undefined, null) },
      { json: "other", js: "other", typ: u(undefined, r("Other")) },
      { json: "versions", js: "versions", typ: u(undefined, r("Versions")) },
      { json: "animated", js: "animated", typ: u(undefined, r("Sprites")) },
  ], false),
  "GenerationI": o([
      { json: "red-blue", js: "redBlue", typ: u(undefined, r("RedBlue")) },
      { json: "yellow", js: "yellow", typ: u(undefined, r("RedBlue")) },
  ], false),
  "RedBlue": o([
      { json: "back_default", js: "backDefault", typ: u(undefined, "") },
      { json: "back_gray", js: "backGray", typ: u(undefined, "") },
      { json: "back_transparent", js: "backTransparent", typ: u(undefined, "") },
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_gray", js: "frontGray", typ: u(undefined, "") },
      { json: "front_transparent", js: "frontTransparent", typ: u(undefined, "") },
  ], false),
  "GenerationIi": o([
      { json: "crystal", js: "crystal", typ: u(undefined, r("Crystal")) },
      { json: "gold", js: "gold", typ: u(undefined, r("Gold")) },
      { json: "silver", js: "silver", typ: u(undefined, r("Gold")) },
  ], false),
  "Crystal": o([
      { json: "back_default", js: "backDefault", typ: u(undefined, "") },
      { json: "back_shiny", js: "backShiny", typ: u(undefined, "") },
      { json: "back_shiny_transparent", js: "backShinyTransparent", typ: u(undefined, "") },
      { json: "back_transparent", js: "backTransparent", typ: u(undefined, "") },
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_shiny", js: "frontShiny", typ: u(undefined, "") },
      { json: "front_shiny_transparent", js: "frontShinyTransparent", typ: u(undefined, "") },
      { json: "front_transparent", js: "frontTransparent", typ: u(undefined, "") },
  ], false),
  "Gold": o([
      { json: "back_default", js: "backDefault", typ: u(undefined, "") },
      { json: "back_shiny", js: "backShiny", typ: u(undefined, "") },
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_shiny", js: "frontShiny", typ: u(undefined, "") },
      { json: "front_transparent", js: "frontTransparent", typ: u(undefined, "") },
  ], false),
  "GenerationIii": o([
      { json: "emerald", js: "emerald", typ: u(undefined, r("OfficialArtwork")) },
      { json: "firered-leafgreen", js: "fireredLeafgreen", typ: u(undefined, r("Gold")) },
      { json: "ruby-sapphire", js: "rubySapphire", typ: u(undefined, r("Gold")) },
  ], false),
  "OfficialArtwork": o([
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_shiny", js: "frontShiny", typ: u(undefined, "") },
  ], false),
  "Home": o([
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_female", js: "frontFemale", typ: u(undefined, null) },
      { json: "front_shiny", js: "frontShiny", typ: u(undefined, "") },
      { json: "front_shiny_female", js: "frontShinyFemale", typ: u(undefined, null) },
  ], false),
  "GenerationVii": o([
      { json: "icons", js: "icons", typ: u(undefined, r("DreamWorld")) },
      { json: "ultra-sun-ultra-moon", js: "ultraSunUltraMoon", typ: u(undefined, r("Home")) },
  ], false),
  "DreamWorld": o([
      { json: "front_default", js: "frontDefault", typ: u(undefined, "") },
      { json: "front_female", js: "frontFemale", typ: u(undefined, null) },
  ], false),
  "GenerationViii": o([
      { json: "icons", js: "icons", typ: u(undefined, r("DreamWorld")) },
  ], false),
  "Stat": o([
      { json: "base_stat", js: "baseStat", typ: u(undefined, 0) },
      { json: "effort", js: "effort", typ: u(undefined, 0) },
      { json: "stat", js: "stat", typ: u(undefined, r("Species")) },
  ], false),
};
