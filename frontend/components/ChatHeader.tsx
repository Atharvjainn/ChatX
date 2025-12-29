import { useAuthStore } from '@/store/useAuthStore'
import { useChatStore } from '@/store/useChatStore'
import { X,Circle } from 'lucide-react'

const ChatHeader = () => {
    const { selectedUser,setSelectedUser} = useChatStore()
    const { onlineUsers } = useAuthStore()
  return (
    <div className='flex items-center justify-between text-white/80 px-10 py-1'>
        <div className='flex items-center gap-4'>
            <div className='relative'>
                <img src={selectedUser?.profilePic || "/avatar.png"} alt="User" className='h-10 w-10 rounded-full flex items-center justify-center' />
                {onlineUsers.includes(selectedUser?._id) ? 
                    <Circle size={10} className="absolute bottom-0.5 right-0.5 text-green-500 fill-green-500 bg-black rounded-full" />
                :
                    <Circle size={10} className="absolute bottom-0.5 right-0.5 text-gray-400 fill-gray-400 bg-black rounded-full" />
                }

            </div>
            
            <div className='flex flex-col'>
                <span>{selectedUser?.fullName}</span>
                {onlineUsers.includes(selectedUser?._id) ?<span className='text-xs'>Online</span> : <span className='text-xs'>Offline</span>}
            </div>
            
        </div>
        <div>
            <X  className="cursor-pointer" onClick={() => setSelectedUser(null)}/>
        </div>
    </div>
  )
}

export default ChatHeader