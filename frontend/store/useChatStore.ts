import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "@/utils/axios"
import { User } from "@/utils/types"

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
}

export const useChatStore = create<ChatStore>((set) => ({
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
     }


}))