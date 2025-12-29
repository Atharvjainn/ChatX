'use client'
import PageLoader from '@/components/PageLoader'
import ChatPage from '@/pages/ChatPage'
import { useAuthStore } from '@/store/useAuthStore'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const page = () => {
  const {authUser, isCheckingAuth,checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  //loader
  if(isCheckingAuth){
    return <PageLoader />
  }
  
  if(authUser === null){
    redirect('/signup')
  }

  return (
    <section className='h-screen w-screen flex justify-center items-center px-8'>
      <ChatPage />
    </section>
        
    
  )
}

export default page