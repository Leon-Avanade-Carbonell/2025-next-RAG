'use server'

import { pokemonTable } from '@/drizzle/db/schema'
import { db } from '@/lib/postgres'

// type PokemonStateType = {
//   success?: string
//   error?: string
// }

export async function getAllPokemonsAction() {
  return db.select().from(pokemonTable)
}

// export async function addPokemonAction(
//   state: PokemonStateType,
//   formData: FormData
// ): Promise<PokemonStateType> {
//   try {
//     // const pokemon = await db.insert(pokemonTable).values({ name }).returning()
//     return { success: `Pokemon added successfully` }
//   } catch (error) {
//     return { error: (error as Error)?.message ?? 'Error registering pokemon' }
//   }
// }
