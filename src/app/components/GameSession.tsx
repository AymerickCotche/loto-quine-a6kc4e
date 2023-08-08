'use client'
import { setGameSessions } from '@/store/features/sessionSlice'
import { setUserInfos } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const GameSession = () => {
  const dispatch = useAppDispatch()

  const {data:session} = useSession()

  const {id} = useAppSelector(state => state.user)

  useEffect(() => {
    if(id) {
      
      dispatch(setGameSessions(id))
    }
  }, [id, dispatch])

  
    return (
      <div>
        yo
      </div>
    )
  
}

export default GameSession
