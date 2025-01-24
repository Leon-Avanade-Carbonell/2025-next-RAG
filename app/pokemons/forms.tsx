'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function AddPokemonForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Pokemon</Button>
        {/* Add Pokemon */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Pokemon</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">This is funky</div>
      </DialogContent>
    </Dialog>
  )
}
