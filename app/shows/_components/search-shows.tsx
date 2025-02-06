'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllShowsAction } from '../actions'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export function SearchShows() {
  const [inputText, setInputText] = useState('')

  const { data, mutate, isPending } = useMutation({
    mutationFn: getAllShowsAction,
  })

  useEffect(() => console.table(data), [data])

  return (
    <>
      <div className="flex flex-row gap-3">
        <div className="flex-grow">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
          />
        </div>
        <div className="content-end">
          <Button onClick={() => mutate(inputText)} disabled={isPending}>
            Search
          </Button>
        </div>
      </div>
      {data && (
        <>
          <div className="my-4 flex max-h-[83vh] flex-col gap-4 overflow-y-auto overflow-x-hidden">
            {data.map((show) => (
              <div key={show.id} className="mr-2 rounded-lg border-2 p-2">
                <div>{show.title}</div>
                <div>
                  <span className="text-purple-500">{show.genre}</span> -{' '}
                  {show.excerpt}
                </div>
                <div className="text-sm">{show.description}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">Results: {data.length}</div>
        </>
      )}
    </>
  )
}
