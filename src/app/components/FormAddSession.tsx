// components/FormAddCard.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addSession, addUser, setCardNumber, setLogMessage, setNumValue, setSelectedSessionForm, setSessionDateInput, setSessionNameInput, setUserNameInput, setUserPasswordInput, toggleShowAddCardModal } from '@/store/features/displaySlice';
import { addCard } from '@/store/features/cardSlice';

const FormAddSession: React.FC = () => {
  const dispatch = useAppDispatch()

  const { sessionForm } = useAppSelector(state => state.display)
  const { logMessage } = useAppSelector(state => state.display)

  const handleChangeSessionNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSessionNameInput(event.target.value))
    dispatch(setLogMessage(''))
  }

  const handleChangeSessionDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSessionDateInput(event.target.value))
    dispatch(setLogMessage(''))
  }

  const handleSubmitSession = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addSession({
      name: sessionForm.name,
      date: sessionForm.date,
      status: sessionForm.status
    }))

    dispatch(setSessionNameInput(''))
    dispatch(setSessionDateInput(''))
  };


  return (
    <div>
    <h2>Ajouter Session</h2>
    <form onSubmit={handleSubmitSession}>
      <label htmlFor="sessionname" className="">
        Nom de la session
      </label>
      <input
        type="text"
        id="sessionname"
        value={sessionForm.name}
        onChange={handleChangeSessionNameInput}
        className=""
      />
      <label htmlFor="sessiondate" className="">
        Date de la session
      </label>
      <input
        type="text"
        id="sessiondate"
        value={sessionForm.date}
        onChange={handleChangeSessionDateInput}
        className=""
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Enregistrer la session
      </button>
    </form>

    <p>{logMessage}</p>
  </div>
  );
};

export default FormAddSession;