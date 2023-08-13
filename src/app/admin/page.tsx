'use client'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getDraws, getNumbers, resetNumberDrawn } from '@/store/features/drawSlice'

import Header from '@/app/components/Header'
import { addSession, addUser, setLogMessage, setSessionDateInput, setSessionNameInput, setUserNameInput, setUserPasswordInput } from '@/store/features/displaySlice'
import FormAddUser from '../components/FormAddUser'
import FormAddSession from '../components/FormAddSession'
import FormAddUserToSession from '../components/FormAddUserToSession'

export default function Admin() {
  const dispatch = useAppDispatch()

  const { userForm } = useAppSelector(state => state.display)
  const { sessionForm } = useAppSelector(state => state.display)
  const { logMessage } = useAppSelector(state => state.display)

  const handleReset = () => {
    dispatch(resetNumberDrawn())
  }

  

  

  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className='mt-4 p-5 min-h-full'>
        
        <FormAddUser/>

        <FormAddSession/>

        <FormAddUserToSession/>
        <div>
          <h2>Lancer nouveau tirage</h2>
        </div>
        
      </main>
    </div>
  )
}
