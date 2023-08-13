// components/FormAddCard.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addUser, setCardNumber, setLogMessage, setNumValue, setSelectedSessionForm, setUserNameInput, setUserPasswordInput, toggleShowAddCardModal } from '@/store/features/displaySlice';
import { addCard } from '@/store/features/cardSlice';

const FormAddUser: React.FC = () => {
  const dispatch = useAppDispatch()

  const { userForm } = useAppSelector(state => state.display)
  const { logMessage } = useAppSelector(state => state.display)

  const handleChangeUserNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserNameInput(event.target.value))
    dispatch(setLogMessage(''))
  }

  const handleChangeUserPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserPasswordInput(event.target.value))
    dispatch(setLogMessage(''))
  }

  const handleSubmitUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addUser({
      username: userForm.username,
      password: userForm.password
    }))

    dispatch(setUserNameInput(''))
    dispatch(setUserPasswordInput(''))
  };


  return (
    <div>
          <h2>Ajouter joueur</h2>
          <form onSubmit={handleSubmitUser}>
            <label htmlFor="name" className="">
              Nom d&apos;utilisateur
            </label>
            <input
              type="text"
              id="name"
              value={userForm.username}
              onChange={handleChangeUserNameInput}
              className=""
            />
            <label htmlFor="password" className="">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={userForm.password}
              onChange={handleChangeUserPasswordInput}
              className=""
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Enregistrer l&apos;utilisateur
            </button>
          </form>

          <p>{logMessage}</p>
          
        </div>
  );
};

export default FormAddUser;