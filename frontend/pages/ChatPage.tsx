"use client"

import ActiveTabSwitch from "@/components/ActiveTabSwitch"
import { useRef, useState,useEffect } from "react"
import Contacts from "@/components/Contacts"
import { useAuthStore } from "@/store/useAuthStore"
import { useChatStore } from "@/store/useChatStore"
import ChatPartners from "@/components/ChatPartners"
import ProfileHeader from "@/components/ProfileHeader"
import ChatHeader from "@/components/ChatHeader"
import NoChatSelected from "@/components/NoChatSelected"
import ChatMessagesLayout from "@/components/ChatMessagesLayout"
import ChatFooter from "@/components/ChatFooter"

export default function ChatPage() {
  const {onlineUsers} = useAuthStore()
  const { activeTab,selectedUser,chatmesages } = useChatStore()
  const scrollref = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
  scrollref.current?.scrollIntoView({ behavior: 'smooth' });
};

  useEffect(() => {
  scrollToBottom();
  console.log(onlineUsers);
  
}, [chatmesages]);

  return (
    <div className="flex h-10/12 w-full max-w-6xl bg-linear-to-b backdrop-blur-lg from-black/20 via-black/40 to-black/90 shadow-lg overflow-hidden rounded-2xl">
      
      {/* LEFT SIDEBAR */}
      <aside className="flex w-[320px] flex-col border-r border-white/10 bg-white/10 backdrop-blur-xl">
        
        {/* TOP BAR */}
        <ProfileHeader />
        

        {/* TABS */}
        <ActiveTabSwitch />

        {/* LIST */}
        <div className="mt-4 flex-1 overflow-y-auto px-2">
          {activeTab === "chats" ? <ChatPartners /> : <Contacts />}
        </div>
      </aside>

      {/* RIGHT CHAT AREA */}
      {!selectedUser ? 
      <NoChatSelected />
      :<main className="flex flex-1 flex-col h-full">
        
        {/* CHAT HEADER */}
        <div className="border-b border-white/10 bg-white/10  py-1 backdrop-blur-xl">
          <ChatHeader />
        </div>

        {/* CHAT BODY */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 text-white/60 ">
         <ChatMessagesLayout />
          {/* <p>This is where messages will appear.</p> */}
        </div>

        {/* INPUT */}
        <ChatFooter />
        <div ref={scrollref} />
      </main>}
    </div>
  )
}
