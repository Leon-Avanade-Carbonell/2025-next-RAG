'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { InsertPokemonType, SelectPokemonType } from '@/drizzle/db/schema'
import { Dispatch, useActionState, useEffect } from 'react'
import {
  addPokemonAction,
  deletePokemonAction,
  updatePokemonAction,
} from './actions'
import { FormInputField } from '@/helpers/form_helper'
import { ColumnDef } from '@tanstack/react-table'
import { DeletePokemonDialog, EditPokemonDialog } from './dialogs'

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
      <div className="flex flex-col gap-4">
        <FormInputField
          label="Name"
          defaultValue={formState.data?.name}
          name="name"
          errors={formState.errors?.name}
        />
        <FormInputField
          label="Pokemon ID"
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

type UpdatePokemonFormPropsType = {
  setOpen: Dispatch<boolean>
  pokemon: SelectPokemonType
}

export function UpdatePokemonForm({
  setOpen,
  pokemon,
}: UpdatePokemonFormPropsType) {
  const [formState, formAction, isPending] = useActionState(
    updatePokemonAction,
    {
      data: pokemon,
    }
  )

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success])

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <FormInputField
          label="Name"
          defaultValue={formState.data?.name}
          name="name"
          errors={formState.errors?.name}
        />
        <FormInputField
          label="Pokemon ID"
          defaultValue={formState.data?.pId.toString()}
          name="pId"
          errors={formState.errors?.pId}
          type="number"
        />
      </div>
      {formState.errorMessage && (
        <div className="text-red-700">{formState.errorMessage}</div>
      )}
      <DialogFooter className="mt-4">
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </DialogFooter>
    </form>
  )
}

type DeletePokemonFormPropsType = {
  setOpen: Dispatch<boolean>
  pokemon: SelectPokemonType
}
export function DeletePokemonForm({
  setOpen,
  pokemon,
}: DeletePokemonFormPropsType) {
  const [formState, formAction, isPending] = useActionState(
    deletePokemonAction,
    {
      data: pokemon,
    }
  )

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success])

  return (
    <form action={formAction}>
      {formState.errorMessage && (
        <div className="text-red-700">{formState.errorMessage}</div>
      )}
      <DialogFooter className="mt-4">
        <Button type="submit" disabled={isPending} className="bg-red-500">
          Delete
        </Button>
        <Button type="reset" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  )
}

export const pokemonTableColumns: ColumnDef<SelectPokemonType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  { accessorKey: 'pId', header: 'Pokemon ID' },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <EditPokemonDialog pokemon={row.original} />
        <DeletePokemonDialog pokemon={row.original} />
      </div>
    ),
  },
]
