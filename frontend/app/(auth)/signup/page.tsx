'use client'
import SignUp from '@/pages/SignUp'
import { useAuthStore } from '@/store/useAuthStore'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import PageLoader from '@/components/PageLoader'

const page = () => {
  const {authUser, isCheckingAuth,checkAuth,isLogginout} = useAuthStore()
     
    useEffect(() => {
      if(!isLogginout) checkAuth()
    },[checkAuth])
  
    //loader
    if(isCheckingAuth || isLogginout ) return <PageLoader />
  
    if(authUser && !isLogginout) redirect('/')

      return (
            <section className='h-screen w-screen flex justify-center items-center px-8'>
                <SignUp />
            </section>
            
  )
}

export default page