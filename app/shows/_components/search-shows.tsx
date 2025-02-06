'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllShowsAction } from '../actions'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export function SearchShows() {
  const [inputText, setInputText] = useState('')

  const { data, mutate } = useMutation({
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
          <Button onClick={() => mutate(inputText)}>Search</Button>
        </div>
      </div>
      {data && (
        <div className="my-2 flex flex-col gap-4">
          {data.map((show) => (
            <div key={show.id}>{show.title}</div>
          ))}
        </div>
      )}
      {/* <ShowList search={search} /> */}
    </>
  )
}
