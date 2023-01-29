export default function GradesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-5xl max-h-64 rounded-lg resize">
      {children}
    </div>
  )
}
