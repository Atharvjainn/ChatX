export default function ContactsLoader() {
  return (
    <div className="flex flex-col gap-3 px-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 backdrop-blur-md"
        >
          {/* Avatar skeleton */}
          <div className="h-10 w-10 animate-pulse rounded-full bg-white/20" />

          {/* Text skeleton */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-3 w-1/2 animate-pulse rounded bg-white/20" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
