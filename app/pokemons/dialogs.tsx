'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { AddPokemonForm, DeletePokemonForm, UpdatePokemonForm } from './forms'
import { SelectPokemonType } from '@/drizzle/db/schema'
import { Pen, Trash2 } from 'lucide-react'

export function AddPokemonDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Pokemon</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a pokemon</DialogTitle>
          <DialogDescription>
            Add a new pokemon in the database with their corresponding ID
          </DialogDescription>
          <AddPokemonForm setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

type UpdatePokemonFormPropsType = {
  pokemon: SelectPokemonType
}

export function EditPokemonDialog({ pokemon }: UpdatePokemonFormPropsType) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="link" onClick={() => setOpen(true)}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit pokemon</DialogTitle>
          <DialogDescription>
            Update the details of a pokemon in the database
          </DialogDescription>
          <UpdatePokemonForm setOpen={setOpen} pokemon={pokemon} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

type DeletePokemonFormPropsType = {
  pokemon: SelectPokemonType
}

export function DeletePokemonDialog({ pokemon }: DeletePokemonFormPropsType) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="link" onClick={() => setOpen(true)}>
          <Trash2 className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete pokemon</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the Pokemon {pokemon.name}?
          </DialogDescription>
          <DeletePokemonForm setOpen={setOpen} pokemon={pokemon} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
