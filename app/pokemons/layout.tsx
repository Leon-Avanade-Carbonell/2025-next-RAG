export default function PokemonsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="x-5 mx-auto max-w-5xl py-5">{children}</div>
}
