import { useChatStore } from '@/store/useChatStore'
import React, { useEffect } from 'react'
import ContactsLoader from "@/components/ContactsLoader"
import EmptyContactsState from './EmptyContactsState'

const Contacts = () => {
    const {activeTab,isUsersLoading,getAllContacts,allContacts,selectedUser,setSelectedUser} = useChatStore()

    useEffect(() => {
        getAllContacts()
    },[getAllContacts])

    if(isUsersLoading) return <ContactsLoader />

    if(allContacts.length==0) return <EmptyContactsState />
    

  return (
    <div className="mt-4 flex-1 overflow-y-auto px-2">
          {allContacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => setSelectedUser(contact)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/5
                ${selectedUser?._id === contact._id ? "bg-white/10" : "" }
              `}
            >
              <img src={contact?.profilePic || "/avatar.png"} alt="" className='h-10 w-10 rounded-full flex items-center justify-center' />

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

export default Contacts