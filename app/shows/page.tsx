import Providers from '@/components/providers'
import { SearchShows } from './_components/search-shows'

export default async function ShowsPage() {
  return (
    <Providers>
      <div className="mx-auto min-h-screen max-w-5xl bg-slate-400 p-5">
        <SearchShows />
      </div>
    </Providers>
  )
}
