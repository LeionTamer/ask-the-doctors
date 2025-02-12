'use client'

import { useMutation } from '@tanstack/react-query'
import { searchScholarAction } from '../_actions/search-scholar-action'

export default function SearchScholar() {
  const { mutate } = useMutation({
    mutationKey: ['search-scholar'],
    mutationFn: searchScholarAction,
  })
  return (
    <>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Search for a scholar..."
          className="flex-grow rounded-lg border p-2"
        />
        <button
          className="rounded-lg bg-blue-500 p-2 text-white"
          onClick={() => mutate()}
        >
          Search
        </button>
      </div>
    </>
  )
}
