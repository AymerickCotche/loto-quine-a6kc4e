// components/FormAddCard.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addNewCard, setCardNumber, setNumValue, setSelectedSessionForm, toggleShowAddCardModal } from '@/store/features/displaySlice';

const FormAddCard: React.FC = () => {
  const dispatch = useAppDispatch()

  const cardNumberInput = useAppSelector((state) => state.display.cardNumberInput)
  const numValuesInput = useAppSelector((state) => state.display.numValuesInput)
  const {sessions} = useAppSelector(state => state.session)
  const {selectedSessionForm} = useAppSelector(state => state.display)
  

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
    // const concatenatedNums = numValuesInput.join(',');
    // // dispatch(addNewCard({
    // //   cardNumber: cardNumberInput,
    // //   playedNumber: concatenatedNums
    // // }))

    for (let i = 0; i< 15; i++) {
      dispatch(setNumValue({ index : i, value: "" }));
    }
    dispatch(setCardNumber(""));
    // // Vous pouvez effectuer ici l'action que vous souhaitez avec la chaîne de caractères concaténée
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50  p-4'>

      <button onClick={handleClickCloseModal} className="bg-blue-500 text-white px-3 py-2 rounded">
        Fermer
      </button>
      <form onSubmit={handleSubmit} className="">
        <select value={selectedSessionForm.sessionId} onChange={handleChange}>
          <option value="">Sélectionnez une session</option>
          {sessions.map(gameSession => (
            <option key={gameSession.session.id} value={gameSession.session.id}>{gameSession.session.name}</option>
          ))}
        </select>
        <label htmlFor="cardNumber" className="block font-medium mb-2">
          Numéro du carton
        </label>
        <input
          type="number"
          id="cardNumber"
          value={cardNumberInput}
          onChange={handleChangeCardNumber}
          className="border p-2 mb-4 w-full"
        />
        <div className="grid grid-cols-5">

          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`num${index + 1}`} className="block font-medium mb-2">{`Num${index + 1}:`}</label>
              <input
                type="number"
                id={`num${index + 1}`}
                value={numValuesInput[index]}
                onChange={(event) => handleChangeNumValue(index, event)}
                className="border p-2 w-full"
              />
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Enregistrer le carton
        </button>
      </form>
    </div>
  );
};

export default FormAddCard;