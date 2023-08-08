'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setDrawNumberInput } from '@/store/features/displaySlice'
import { addDrawnNumber, updateDraws } from '@/store/features/drawSlice'

const DrawNumber: React.FC = () => {
  const dispatch = useAppDispatch()

  const {drawNumberInput} = useAppSelector(state => state.display)
  const {allnumbers} = useAppSelector(state => state.draw)

  const hcDrawNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDrawNumberInput(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const numberData = allnumbers.find(number => number.value === drawNumberInput)
    if (numberData) {
      const bodyData = {
        drawId: 'clkz71ir40000ly8xca7vhei4',
        numberId: numberData.id,
        numberValue: drawNumberInput
      }
      dispatch(addDrawnNumber(drawNumberInput))
      dispatch(updateDraws(bodyData))
    }
    
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