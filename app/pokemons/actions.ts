'use server'

import {
  InsertPokemonSchema,
  InsertPokemonType,
  pokemonTable,
} from '@/drizzle/db/schema'
import { ActionResponseType } from '@/helpers/form_helper'
import { db } from '@/lib/postgres'
import { revalidatePath } from 'next/cache'

export async function getAllPokemonsAction() {
  return db.select().from(pokemonTable)
}

export async function addPokemonAction(
  prevState: ActionResponseType<InsertPokemonType>,
  formData: unknown
): Promise<ActionResponseType<InsertPokemonType>> {
  if (!(formData instanceof FormData))
    return {
      success: false,
      errorMessage: 'Invalid form data',
    }

  const data = Object(Object.fromEntries(formData.entries()))

  try {
    const result = InsertPokemonSchema.safeParse(data)

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
        data: { ...prevState.data, ...data },
      }
    }

    revalidatePath('/pokemons')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      errorMessage: (error as Error)?.message ?? 'Error registering pokemon',
      data: { ...prevState.data, ...data },
    }
  }
}
