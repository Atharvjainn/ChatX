import React, { useRef, useState } from 'react'
import { SendHorizonal } from 'lucide-react'
import { useChatStore } from '@/store/useChatStore'
import { ImagePlus } from 'lucide-react'
import { X } from 'lucide-react'

const ChatFooter = () => {
    const { sendMessage,selectedUser } = useChatStore()
    const [message,setMessage] = useState({text : "",image : ""})
    const imageinput = useRef<HTMLInputElement | null>(null)

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            e.preventDefault()
            ButtonHandler()
        }
    }

    const inputhandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onloadend = async () : Promise<void> => {
        const base64Image = reader.result as string;
        setMessage({...message,image : base64Image})
        if (imageinput.current) {
        imageinput.current.value = "";
        }
      };
    }

    const ButtonHandler = () => {
        if (!message.text.trim() && !message.image) return;
        sendMessage({...message ,UserId : selectedUser?._id })
        setMessage({text : "",image : ""})
    }

    const imageclose = () => {
      setMessage({...message , image : ""})
    }

  return (
    <div className="border-t flex items-center gap-2 border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
      {message.image && (
        <div className='absolute pt-2 '>
            <img
            src={message.image}
            alt="preview"
            className="size-20 mb-40 mt-5 object-cover rounded-md"
          />
            <X  className='text-white absolute top-0 right-0 cursor-pointer ' onClick={imageclose}/>


        </div>
        
      )}
      <div className='flex flex-1 items-center relative'>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-lg justify-start bg-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
            value={message.text}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage({...message , text : e.target.value}) }
          />
          <button className='flex items-center cursor-pointer'  onClick={() => imageinput.current?.click()} >
            <ImagePlus className='text-white absolute right-3' />
            <input type='file' accept='image/*' ref={imageinput} onChange={inputhandler} className='hidden' />
          </button>
          
      </div>
          <SendHorizonal onClick={ButtonHandler} className='text-white cursor-pointer justify-end ' />
    </div>
  )
}

export default ChatFooter