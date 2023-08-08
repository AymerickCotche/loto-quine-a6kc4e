'use client'
import { setUserInfos } from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hook'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const SigninButton = () => {
  const dispatch = useAppDispatch()
  const {data:session} = useSession()

  useEffect(() => {
    if(session && session.user) {
      dispatch(setUserInfos({name: session.user.name, id: session.user.id}))
    }
  }, [session, dispatch])

  if(session && session.user) {
    return (
      <div className='flex gap-4 ml-auto'>
        <p className='text-sky-600'>{session.user.name}</p>
        <button onClick={()=>signOut()} className='text-red-600)'>
          Sign Out
        </button>
      </div>
    )
  }
  return <button onClick={() => signIn()} className="text-green-600 ml-auto">Sign In</button>
}

export default SigninButton
