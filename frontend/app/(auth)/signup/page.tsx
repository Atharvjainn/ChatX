'use client'
import SignUp from '@/pages/SignUp'
import { useAuthStore } from '@/store/useAuthStore'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import PageLoader from '@/components/PageLoader'

const page = () => {
  const {authUser, isCheckingAuth,checkAuth} = useAuthStore()
     
    useEffect(() => {
      checkAuth()
    },[checkAuth])
  
    //loader
    if(isCheckingAuth) return <PageLoader />
  
    if(authUser) redirect('/chats')

      return (
            <section className='h-screen w-screen flex justify-center items-center px-8'>
                <SignUp />
            </section>
            
  )
}

export default page