import { getAllPokemonsAction } from './actions'
import { AddPokemonDialog } from './dialogs'

export default async function PokemonsPage() {
  const pokemons = await getAllPokemonsAction()
  return (
    <>
      <div>
        <div>Pokemons Page</div>
        <AddPokemonDialog />
        <div>
          {pokemons.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </div>
      </div>
    </>
  )
}
