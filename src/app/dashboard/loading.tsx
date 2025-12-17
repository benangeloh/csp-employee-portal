export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-blue-950 text-foreground p-8 flex justify-center items-start">
      <div className="text-xl font-semibold text-slate-100 animate-pulse">
        Loading Dashboard Data...
      </div>
    </div>
  )
}