'use client'
import { setGameSessions, setSelectedSession } from '@/store/features/sessionSlice'
import { setUserInfos } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const GameSession = () => {
  const dispatch = useAppDispatch()

  const {data:session} = useSession()

  const {id} = useAppSelector(state => state.user)
  const {sessions} = useAppSelector(state => state.session)
  const {selectedSession} = useAppSelector(state => state.session)
 
  useEffect(() => {
    if(id) {
      
      dispatch(setGameSessions(id))
    }
  }, [id, dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sessionId = event.target.value;
    const foundSession = sessions.find(gameSession => gameSession.session.id === sessionId)
    dispatch(setSelectedSession(foundSession))
  }
  
    return (
      <div>
        <select value={selectedSession.sessionId} onChange={handleChange}>
          <option value="">Sélectionnez une session</option>
          {sessions.map(gameSession => (
            <option key={gameSession.session.id} value={gameSession.session.id}>{gameSession.session.name}</option>
          ))}
        </select>

      </div>
    )
  
}

export default GameSession
