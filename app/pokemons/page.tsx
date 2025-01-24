import { getAllPokemonsAction } from './actions'
import { AddPokemonForm } from './forms'

export default async function PokemonsPage() {
  const pokemons = await getAllPokemonsAction()
  return (
    <>
      <div>
        <div>Pokemons Page</div>
        <div>
          <AddPokemonForm />
        </div>
        <div>
          {pokemons.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </div>
      </div>
    </>
  )
}
