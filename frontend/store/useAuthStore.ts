import {create} from 'zustand';
import {axiosInstance} from "../utils/axios"
import type { User } from '../utils/types';

type AuthStore = {
    authUser : User|null,
    isCheckingAuth : boolean,
    checkAuth : () => void,
}

export const useAuthStore = create<AuthStore>((set) =>({
    authUser : null,
    isCheckingAuth : true,

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
    }
    
}))