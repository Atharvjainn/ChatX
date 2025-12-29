import { useChatStore } from '@/store/useChatStore'
import React, { useEffect } from 'react'
import ContactsLoader from "@/components/ContactsLoader"
import EmptyContactsState from './EmptyContactsState'
import { Circle } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

const ChatPartners = () => {
    const {activeTab,isUsersLoading,getChatPartners,chatPartners,selectedUser,setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore()
    
    useEffect(() => {
        getChatPartners()
    },[getChatPartners])

    if(isUsersLoading) return <ContactsLoader />


    if(chatPartners.length==0) return <EmptyContactsState />
    

  return (
    <div className="mt-4 flex-1 overflow-y-auto px-2">
      
          {chatPartners.map((contact, i) => (
            <div
              key={contact._id}
              onClick={() => setSelectedUser(contact)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/5
                ${selectedUser?._id === contact._id ? "bg-white/10" : "" }
              `}
            >
              <div className='relative'>
                  <img src={contact?.profilePic || "/avatar.png"} alt="" className='h-10 w-10 rounded-full flex items-center justify-center' />
                  
                {onlineUsers.includes(contact._id) ?
                                <Circle
                                  size={10}
                                  className="absolute bottom-0.5 right-0.5 text-green-500 fill-green-500 bg-black rounded-full"
                                />
                              : 
                                <Circle
                                  size={10}
                                  className="absolute bottom-0.5 right-0.5 text-gray-400 fill-gray-400 bg-black rounded-full"
                                />
                              
                              }

              </div>
              

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {contact.fullName}
                </span>
                {activeTab === "chats" && (
                  <span className="text-xs text-white/50">
                    Last message preview...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
  )
}

export default ChatPartners