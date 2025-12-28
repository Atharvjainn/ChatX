import { useChatStore } from '@/store/useChatStore';
import { useEffect,useRef } from 'react';
import MessagesLoading from '@/components/MessagesLoading';
import { useAuthStore } from '@/store/useAuthStore';
import { Message } from '@/utils/types';
import NoMessages from './NoMessages';

const ChatMessagesLayout = () => {
  const {
    chatmesages,
    getChatMessages,
    ismessagesloading,
    selectedUser,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const scrollref = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
  scrollref.current?.scrollIntoView({ behavior: 'smooth' });
};

  useEffect(() => {
  scrollToBottom();
}, [chatmesages]);

  useEffect(() => {
    if (selectedUser?._id) {
      getChatMessages(selectedUser._id);
    }
  }, [getChatMessages, selectedUser?._id]);

  if (ismessagesloading) {
    return <MessagesLoading />;
  }

  if(chatmesages.length == 0) {
    return <NoMessages />
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-4">
      {chatmesages?.map((msg: Message,i : number) => {
        const isSender = msg.senderId === authUser?._id;

        return (
          <div
            key={i}
            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${
                  isSender
                    ? 'bg-[#2d5389] text-white rounded-br-md'
                    : 'bg-black text-gray-100 rounded-bl-md'
                }`}
            >
              <p>{msg.text}</p>

              <span className="block text-[10px] mt-1 opacity-70 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        );
      })}
      <div ref={scrollref}/>
    </div>
  );
};

export default ChatMessagesLayout;
