export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="x-5 mx-auto max-w-5xl">{children}</div>
}
