// components/FormAddCard.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setCardNumber, setNumValue, setSelectedSessionForm, toggleShowAddCardModal } from '@/store/features/displaySlice';
import { addCard } from '@/store/features/cardSlice';

const FormAddDraw: React.FC = () => {
  const dispatch = useAppDispatch()

  const cardNumberInput = useAppSelector((state) => state.display.cardNumberInput)
  const numValuesInput = useAppSelector((state) => state.display.numValuesInput)
  const {sessions} = useAppSelector(state => state.session)
  const {selectedSessionForm} = useAppSelector(state => state.display)
  const {id} = useAppSelector(state => state.user)
  

  const handleChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCardNumber(event.target.value));
  };

  const handleChangeNumValue = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumValue({ index, value: event.target.value }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sessionId = event.target.value;
    const foundSession = sessions.find(gameSession => gameSession.session.id === sessionId)
    dispatch(setSelectedSessionForm(foundSession))
  }

  const handleClickCloseModal = () => {
    dispatch(toggleShowAddCardModal(''))
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addCard({
      cardName: cardNumberInput,
      userId: id,
      sessionId: selectedSessionForm.sessionId,
      numbers: numValuesInput
    }))

    // for (let i = 0; i< 15; i++) {
    //   dispatch(setNumValue({ index : i, value: "" }));
    // }
    // dispatch(setCardNumber(""));
    // // Vous pouvez effectuer ici l'action que vous souhaitez avec la chaîne de caractères concaténée
  };

  return (
    <div className=' flex flex-col items-center justify-center p-4'>

      <button onClick={handleClickCloseModal} className="bg-blue-500 text-white px-3 py-2 rounded">
        Fermer
      </button>
      <form onSubmit={handleSubmit} className="">
       
        <label htmlFor="newdraw" className="block font-medium mb-2">
          Nom du tirage
        </label>
        <input
          type="text"
          id="newdraw"
          value={cardNumberInput}
          onChange={handleChangeCardNumber}
          className="border p-2 mb-4 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Lancer nouveau tirage
        </button>
      </form>
    </div>
  );
};

export default FormAddDraw