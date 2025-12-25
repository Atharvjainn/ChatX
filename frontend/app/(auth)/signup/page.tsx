'use client'
import SignUp from '@/pages/SignUp'
import { useAuthStore } from '@/store/useAuthStore'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const page = () => {
  const {authUser, isCheckingAuth,checkAuth} = useAuthStore()
     
    useEffect(() => {
      checkAuth()
    },[checkAuth])
  
    //loader
  
    if(authUser) redirect('/chats')

      return (
        <>
            <SignUp />
        </>
  )
}

export default page