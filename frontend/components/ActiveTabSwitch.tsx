import React from 'react'
import { useChatStore } from '../store/useChatStore';

const ActiveTabSwitch = () => {
    const {activeTab,setActiveTab} = useChatStore()
  return (
    <div className="flex gap-2 px-4">
          <button className={`flex-1 cursor-pointer rounded-md py-2 text-sm font-medium ${activeTab ==="chats" ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10" }`} onClick={() => setActiveTab("chats")}>
            Chats
          </button>

         <button className={`flex-1 cursor-pointer rounded-md py-2 text-sm font-medium ${activeTab ==="contacts" ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10" }`} onClick={() => setActiveTab("contacts")}>
            Contacts
          </button>
        </div>
  )
}

export default ActiveTabSwitch