import { useChatStore } from '@/store/useChatStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
    const { selectedUser,setSelectedUser } = useChatStore()
  return (
    <div className='flex items-center justify-between text-white/80 px-10 py-1'>
        <div className='flex items-center gap-4'>
            <img src={selectedUser?.profilePic || "/avatar.png"} alt="User" className='h-10 w-10 rounded-full flex items-center justify-center' />
            <span>{selectedUser?.fullName}</span>
        </div>
        <div>
            <X  className="cursor-pointer" onClick={() => setSelectedUser(null)}/>
        </div>
    </div>
  )
}

export default ChatHeader