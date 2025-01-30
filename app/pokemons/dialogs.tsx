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
import { AddPokemonForm } from './forms'

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
