'use server'

import {
  InsertPokemonSchema,
  InsertPokemonType,
  pokemonTable,
  SelectPokemonType,
} from '@/drizzle/db/schema'
import { ActionResponseType } from '@/helpers/form_helper'
import { db } from '@/lib/postgres'
import { eq } from 'drizzle-orm/sql'
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

    await db.insert(pokemonTable).values(data)

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

export async function updatePokemonAction(
  prevState: ActionResponseType<SelectPokemonType>,
  formData: unknown
): Promise<ActionResponseType<SelectPokemonType>> {
  if (!(formData instanceof FormData))
    return {
      success: false,
      errorMessage: 'Invalid form data',
    }

  const data = Object(
    Object.fromEntries(formData.entries())
  ) as SelectPokemonType

  try {
    await db
      .update(pokemonTable)
      .set({
        name: data.name,
        pId: data.pId,
      })
      .where(eq(pokemonTable.id, prevState.data!.id))

    revalidatePath('/pokemons')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      errorMessage: (error as Error)?.message ?? 'Error updating pokemon',
      data: { ...prevState.data, ...data },
    }
  }
}

export async function deletePokemonAction(
  prevState: ActionResponseType<SelectPokemonType>,
  formData: unknown
): Promise<ActionResponseType<SelectPokemonType>> {
  if (!(formData instanceof FormData))
    return {
      success: false,
      errorMessage: 'Invalid form data',
    }

  const data = Object(
    Object.fromEntries(formData.entries())
  ) as SelectPokemonType
  try {
    await db.delete(pokemonTable).where(eq(pokemonTable.id, prevState.data!.id))

    revalidatePath('/pokemons')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      errorMessage: (error as Error)?.message ?? 'Error updating pokemon',
      data: { ...prevState.data, ...data },
    }
  }
  // return db.delete(pokemonTable).where(eq(pokemonTable.id, pokemon.id))
}
