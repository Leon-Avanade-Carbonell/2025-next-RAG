'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { InsertPokemonType } from '@/drizzle/db/schema'
import { Dispatch, useActionState, useEffect } from 'react'
import { addPokemonAction } from './actions'
import { FormInputField } from '@/helpers/form_helper'

const initialValue: InsertPokemonType = {
  name: '',
  pId: 0,
}

type AddPokemonFormPropsType = {
  setOpen: Dispatch<boolean>
}

export function AddPokemonForm({ setOpen }: AddPokemonFormPropsType) {
  const [formState, formAction, isPending] = useActionState(addPokemonAction, {
    data: initialValue,
  })

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success])

  return (
    <form action={formAction}>
      <div>
        <FormInputField
          label="name"
          defaultValue={formState.data?.name}
          name="name"
          errors={formState.errors?.name}
        />
        <FormInputField
          label="pokemon ID"
          defaultValue={formState.data?.pId.toString()}
          name="pId"
          errors={formState.errors?.pId}
          type="number"
        />
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </DialogFooter>
    </form>
  )
}
