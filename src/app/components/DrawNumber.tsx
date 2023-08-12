import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setDrawNumberInput } from '@/store/features/displaySlice'
import { addDrawnNumber, updateDraws } from '@/store/features/drawSlice'
import { setDrawn } from '@/store/features/cardSlice'

const DrawNumber: React.FC = () => {
  const dispatch = useAppDispatch()

  const {drawNumberInput} = useAppSelector(state => state.display)
  const {allnumbers} = useAppSelector(state => state.draw)
  const {draws} = useAppSelector(state => state.draw)

  const lastestDraw = draws[draws.length - 1]

  const hcDrawNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDrawNumberInput(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const bodyData = {
      drawId: lastestDraw.id,
      numberValue: drawNumberInput
    }
    // dispatch(addDrawnNumber(drawNumberInput))
    dispatch(updateDraws(bodyData))
    dispatch(setDrawn(drawNumberInput))
    
    
    dispatch(setDrawNumberInput(''))

  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label htmlFor="number" className="block font-medium mb-2">
        Numéro:
      </label>
      <input
        type="text"
        id="number"
        value={drawNumberInput}
        onChange={hcDrawNumberInput}
        className="border p-2 mb-4 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Envoyer
      </button>
    </form>
  );
};

export default DrawNumber