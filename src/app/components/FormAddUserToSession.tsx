// components/FormAddCard.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addUser, setCardNumber, setLogMessage, setNumValue, setSelectedSessionForm, setUserNameInput, setUserPasswordInput, toggleShowAddCardModal } from '@/store/features/displaySlice';
import { addCard } from '@/store/features/cardSlice';
import { addUserOnSession, getUsersWithSession, setSelectedUser } from '@/store/features/userSlice';
import { getAllSessions } from '@/store/features/sessionSlice';

const FormAddUserToSession: React.FC = () => {
  const dispatch = useAppDispatch()

  const { usersWithSession } = useAppSelector(state => state.user)
  const { selectedUserWithSession } = useAppSelector(state => state.user)
  const { sessions } = useAppSelector(state => state.session)

  useEffect(() => {
    dispatch(getUsersWithSession())
    dispatch(getAllSessions())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsersWithSession())
    dispatch(getAllSessions())
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    const foundUser = usersWithSession.find(user => user.id === userId)
    dispatch(setSelectedUser(foundUser))
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addUserOnSession({
      userId: selectedUserWithSession.id,
      sessionId: event.currentTarget.getAttribute("data-value")!,
      sessionName: event.currentTarget.getAttribute("data-value2")!
    }))
  }

  return (
    <div>

        <select value={selectedUserWithSession.id} onChange={handleChange}>
          <option value="">Sélectionnez un utilisateur</option>
          {usersWithSession.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <div className='grid grid-cols-2 border border-black'>
          <div className='border border-r-black'>
            <h3 className='text-center border border-b-black'>Session deja attribuée</h3>

              {selectedUserWithSession.id !== '' && 
                <div>
                  {selectedUserWithSession.sessions.map(session => (
                    <p key={session.id}>{session.name}</p>
                  ))}
                </div>
              }

          </div>

          <div>
            <h3 className='text-center border border-b-black'>Sessions disponibles</h3>
            {selectedUserWithSession.id !== '' && 
                <div>
                  {sessions.map(session => (
                    <p key={session.sessionId}>{session.name} <span className='text-blue-700 underline hover:cursor-pointer' data-value={session.sessionId} data-value2={session.name} onClick={handleClick}>ajouter</span></p>
                  ))}
                </div>
              }
          </div>

        </div>
          
    </div>
  );
};

export default FormAddUserToSession;