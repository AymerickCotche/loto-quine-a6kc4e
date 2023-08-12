'use client'

import SigninButton from '@/app/components/SigninButton'
import { toggleShowAddCardModal } from '@/store/features/displaySlice'
import { resetNumberDrawn } from '@/store/features/drawSlice'
import { useAppDispatch } from '@/store/hook'


export default function Header() {
  const dispatch = useAppDispatch()

  const handleReset = () => {
    dispatch(resetNumberDrawn())
  }
  const handleClickAddCard = () => {
    dispatch(toggleShowAddCardModal(''))
  }

  return (

    <header className='flex justify-between p-10 bg-gradient-to-b from-cyan-400/40 to-white/50 border-b-2-silver shadow-lg items-center text-fuchsia-500'>
      <div>
      <button onClick={handleClickAddCard} className='bg-green-700 hover:bg-green-800 duration-300  text-white border  p-3 rounded-lg'>Ajouter un carton</button>
      </div>
      <h1 className='text-3xl font-bold'>Loto Quine Freedom</h1>
      <div>
        <SigninButton/>
        <button onClick={handleReset} className='hidden border border-red-500 bg-black text-white p-2'>
          reset tirage pour test
        </button>
      </div>
      
    </header>
      

  )
}
