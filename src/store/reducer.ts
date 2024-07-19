
export const reducer = (state, action) => {
  console.log("state is", state)
  if (!state) return { selectedPokemon: undefined };

  if (action.type === 'SELECT_POKEMON')
    return { ...state, selectedPokemon: action.pokemon }
  return state
}