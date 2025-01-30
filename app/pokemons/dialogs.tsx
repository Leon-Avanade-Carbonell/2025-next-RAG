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
import { AddPokemonForm, UpdatePokemonForm } from './forms'
import { SelectPokemonType } from '@/drizzle/db/schema'
import { Pen } from 'lucide-react'

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
        <Button variant="outline" onClick={() => setOpen(true)}>
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
