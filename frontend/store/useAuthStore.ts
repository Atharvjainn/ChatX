import {create} from 'zustand';
import {axiosInstance} from "../utils/axios"
import type { User } from '../utils/types';
import toast from 'react-hot-toast';
import { Socket,io } from "socket.io-client";

type AuthStore = {
    authUser : User|null,
    isCheckingAuth : boolean,
    isUpdatingProfile : boolean,
    checkAuth : () => void,
    isSigningin : boolean,
    isLogginingin : boolean,
    SignIn : (data : {email : string, fullName : string, password : string}) => void,
    Login : (data : {email : string, password : string}) => void,
    Logout : () => void,
    isLogginout : boolean,
    updateProfile : (profilePic : string) => void,
    onlineUsers : any[],
    socket : Socket | null,
    connectSocket : () => void,
    disconnectSocket : () => void,
}

const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL

export const useAuthStore = create<AuthStore>((set,get) =>({
    authUser : null,
    isCheckingAuth : true,
    isSigningin : false,
    isLogginingin : false,
    isLogginout : false,
    isUpdatingProfile : false,
    onlineUsers : [],
    socket : null,

    checkAuth : async () => {
        try {
            const response = await axiosInstance.get("/auth/check")
            set({authUser : response.data})
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck",error);
            set({authUser : null});
        } finally{
            set({isCheckingAuth : false});
        }
    },

    SignIn : async (data : {email : string, fullName : string, password : string}) => {
        set({isSigningin : true})
        try {
            const response = await axiosInstance.post('/auth/signup',data)
            console.log(response);
            set({authUser : response.data.data})
            toast.success("Signed up successfully!")
            get().connectSocket()
        } catch (error : any) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningin : false})
        }
    },

    Login : async(data : {email : string , password : string}) => {
        set({isLogginingin : true})
        try {
            const response = await axiosInstance.post('/auth/login',data)
            set({authUser : response.data})
            toast.success("Logged in successfully!")
            get().connectSocket()
        } catch (error : any) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLogginingin : false})
        }
    },

    Logout : async() => {
        set({isLogginout : true})
        try {
            const res = await axiosInstance.post('/auth/logout')
            set({authUser : null})
            toast.success(res.data.message)
            get().disconnectSocket()
        } catch (error : any) {
            toast.error(error.response.data.message)
        } finally {
            set({isLogginout : false})
        }
    },

    updateProfile : async(profilePic : string) => {
        set({isUpdatingProfile : true})
        try {
            const response = await axiosInstance.put('/auth/updateProfile',{ profilePic })
            set({authUser : response.data.data})
            toast.success("Profile Update Successfully!")
        } catch (error : any) {
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile : false})
        }
    },


    connectSocket : () => {
        const { authUser } = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            withCredentials : true
        });
        
        socket.connect()
        set({socket})

        socket.on('getOnlineUsers',(userIds) => {
            set({onlineUsers : userIds })
        })
    },

    disconnectSocket : () => {
        if(get().socket?.connected) get().socket?.disconnect()
    }

    
}))