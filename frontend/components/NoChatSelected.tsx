import { MessageSquare } from "lucide-react"

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 h-full flex-col items-center justify-center text-center px-6">
      
      {/* Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
        <MessageSquare className="h-8 w-8 text-white/70" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-white">
        Select a conversation
      </h2>

      {/* Subtitle */}
      <p className="mt-2 max-w-sm text-sm text-white/60">
        Choose a contact from the left to start chatting or continue a conversation.
      </p>
    </div>
  )
}

export default NoChatSelected
