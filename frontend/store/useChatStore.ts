import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "@/utils/axios"
import { User } from "@/utils/types"
import { useAuthStore } from "./useAuthStore"

type ChatStore = {
    activeTab : string,
    setActiveTab : (tab : string) => void,
    isUsersLoading : boolean,
    allContacts : any[],
    getAllContacts : () => void,
    chatPartners : any[],
    getChatPartners : () => void,
    selectedUser : User | null,
    setSelectedUser : (user : User | null) => void,
    chatmesages : any[],
    getChatMessages : (UserId : string | undefined) => void,
    ismessagesloading : boolean,
    sendMessage : (data : {text : string,image : string,UserId : string | undefined}) => void,
    subscribeToMessages : () => void,
    UnsubscribeFromMessages : () => void,
}

export const useChatStore = create<ChatStore>((set,get) => ({
    activeTab : "chats",
    isUsersLoading : false,
    allContacts : [],
    chatPartners : [],
    selectedUser : null,
    chatmesages : [],
    ismessagesloading : false,
    
    setActiveTab : (tab : string) => {
        set({activeTab : tab})
    },

    getAllContacts : async() => {
        set({isUsersLoading : true})
        try {
            const res = await axiosInstance.get('/messages/contacts')
            set({allContacts : res.data})
        } catch (error : any) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading : false})
        }
    },

    getChatPartners : async() => {
        set({isUsersLoading : true})
        try {
            const response = await axiosInstance.get('/messages/chats')
            set({chatPartners : response.data})
        } catch (error : any) {
            toast.error(error.response.data.message)
        } finally { 
            set({isUsersLoading : false})
        }
    },

    setSelectedUser : (user : User | null) => set({selectedUser : user}),

     getChatMessages : async(UserId : string | undefined) => {
        set({ismessagesloading : true})
        try {
            const response = await axiosInstance.get(`/messages/${UserId}`)
            set({chatmesages : response.data})
        } catch (error : any) {
            toast.error(error.response.data.message)
        } finally {
            set({ismessagesloading : false})
        }
     },

     sendMessage : async(data : {text : string,image : string,UserId : string | undefined}) => {
        const { authUser } = useAuthStore.getState()
        const {selectedUser,chatmesages} = get()
        const tempId = `temp-${Date.now()}`
        const optimisticmessage = {
            _id : tempId,
            senderId : authUser?._id,
            receiverId : selectedUser?._id,
            text : data.text ,
            image : data.image ,
            createdAt : new Date().toISOString(),
            isOptimistic : true,
        }

        console.log(optimisticmessage);
        set({chatmesages : [...chatmesages,optimisticmessage]})
        
        
        try {
            const {text,image,UserId} = data
            const response = await axiosInstance.post(`/messages/send/${UserId}`,{text,image})
            set({chatmesages : [...chatmesages,response.data]})
        } catch (error :any) {
            set({ chatmesages: chatmesages });
            toast.error(error.response.data.message || "Something went wrong")
        }
     },

     subscribeToMessages : () => {
        const { selectedUser } = get()
        if(!selectedUser) return 

        const socket = useAuthStore.getState().socket

        socket?.on('newMessage',(newMessage) => {
            const ismessagesentfromselecteduser = newMessage.senderId === selectedUser._id
            if(!ismessagesentfromselecteduser) return 

            const messages = get().chatmesages
            set({chatmesages : [...messages,newMessage]})
        })
     },

     UnsubscribeFromMessages : () => {
        const socket = useAuthStore.getState().socket
        socket?.off('newMessage')
     }


}))