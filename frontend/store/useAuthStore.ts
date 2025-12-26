import {create} from 'zustand';
import {axiosInstance} from "../utils/axios"
import type { User } from '../utils/types';
import toast from 'react-hot-toast';
import { log } from 'node:console';

type AuthStore = {
    authUser : User|null,
    isCheckingAuth : boolean,
    checkAuth : () => void,
    isSigningin : boolean,
    isLogginingin : boolean,
    SignIn : (data : {email : string, fullName : string, password : string}) => void,
    Login : (data : {email : string, password : string}) => void,
}

export const useAuthStore = create<AuthStore>((set) =>({
    authUser : null,
    isCheckingAuth : true,
    isSigningin : false,
    isLogginingin : false,

    checkAuth : async () => {
        try {
            const response = await axiosInstance.get("/auth/check")
            set({authUser : response.data})
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
        } catch (error : any) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLogginingin : false})
        }
    }


    
}))