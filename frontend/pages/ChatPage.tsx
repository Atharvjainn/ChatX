"use client"

import ActiveTabSwitch from "@/components/ActiveTabSwitch"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import Contacts from "@/components/Contacts"
import { useAuthStore } from "@/store/useAuthStore"
import { useChatStore } from "@/store/useChatStore"
import ChatPartners from "@/components/ChatPartners"

export default function ChatPage() {
  const {isLogginout,Logout} = useAuthStore()
  const { activeTab } = useChatStore()

  return (
    <div className="flex h-10/12 w-full max-w-6xl bg-gradient-to-b backdrop-blur-lg from-black/20 via-black/40 to-black/90 shadow-lg overflow-hidden rounded-2xl">
      
      {/* LEFT SIDEBAR */}
      <aside className="flex w-[320px] flex-col border-r border-white/10 bg-white/10 backdrop-blur-xl">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-lg font-semibold text-white">ChatX</h2>

          <Button className="cursor-pointer rounded-md bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20" onClick={() => Logout()}>
            Logout
          </Button>
        </div>

        {/* TABS */}
        <ActiveTabSwitch />

        {/* LIST */}
        <div className="mt-4 flex-1 overflow-y-auto px-2">
          {activeTab === "chats" ? <ChatPartners /> : <Contacts />}
        </div>
      </aside>

      {/* RIGHT CHAT AREA */}
      <main className="flex flex-1 flex-col">
        
        {/* CHAT HEADER */}
        <div className="border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
          <h3 className="text-lg font-medium text-white">
            Select a chat
          </h3>
        </div>

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-4 text-white/60">
          <p>This is where messages will appear.</p>
        </div>

        {/* INPUT */}
        <div className="border-t border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
      </main>
    </div>
  )
}
