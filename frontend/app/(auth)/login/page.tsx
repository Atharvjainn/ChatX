'use client'
import PageLoader from '@/components/PageLoader'
import Login from '@/pages/Login'
import { useAuthStore } from '@/store/useAuthStore'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const page = () => {
   const {authUser, isCheckingAuth,checkAuth,isLogginout} = useAuthStore()
   
     useEffect(() => {
      
       checkAuth()
     },[checkAuth])
   
     //loader
     if(isCheckingAuth || isLogginout) return <PageLoader />
     
     //redirect if logged in
     if(authUser) redirect('/')
      
  return (
     <section className='h-screen w-screen flex justify-center items-center px-8'>
         <Login />
     </section>
        
     
  )
}

export default page