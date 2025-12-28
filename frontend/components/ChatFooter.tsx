import React, { useState } from 'react'
import { SendHorizonal } from 'lucide-react'
import { useChatStore } from '@/store/useChatStore'
const ChatFooter = () => {
    const { sendMessage,selectedUser } = useChatStore()
    const [message,setMessage] = useState({text : "",image : ""})

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            e.preventDefault()
            ButtonHandler()
        }
    }

    const ButtonHandler = () => {
        if (!message.text.trim()) return;
        sendMessage({...message ,UserId : selectedUser?._id })
        setMessage({text : "",image : ""})
    }

  return (
    <div className="border-t flex items-center gap-2 border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-lg justify-start bg-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
            value={message.text}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage({...message , text : e.target.value}) }
          />
          <SendHorizonal onClick={ButtonHandler} className='text-white cursor-pointer justify-end ' />
    </div>
  )
}

export default ChatFooter