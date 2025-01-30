import { DataTable } from '@/helpers/table_helper'
import { getAllPokemonsAction } from './actions'
import { AddPokemonDialog } from './dialogs'
import { pokemonTableColumns } from './forms'

export default async function PokemonsPage() {
  const pokemons = await getAllPokemonsAction()
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <AddPokemonDialog />
        </div>
        <DataTable data={pokemons} columns={pokemonTableColumns} />
      </div>
    </>
  )
}
