import { MessageCircle } from "lucide-react"

const EmptyContactsState = () => {
  return (
    <div className="mt-4 flex-1 overflow-y-auto px-2">
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
        <MessageCircle className="h-7 w-7 text-white/70" />
      </div>

      <h3 className="text-sm font-semibold text-white">
        No conversation found
      </h3>

      <p className="text-xs text-white/60">
        Start a new chat to see them here
      </p>
    </div>
    </div>
  )
}

export default EmptyContactsState
