export default function SyllabusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl max-h-64 bg-zinc-400 resize rounded-lg">
      {children}
    </div>
  )
}
