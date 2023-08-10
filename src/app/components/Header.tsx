'use client'

import SigninButton from '@/app/components/SigninButton'
import { resetNumberDrawn } from '@/store/features/drawSlice'
import { useAppDispatch } from '@/store/hook'

export default function Header() {
  const dispatch = useAppDispatch()

  const handleReset = () => {
    dispatch(resetNumberDrawn())
  }

  return (

    <header className='flex justify-between p-10 bg-gradient-to-b from-cyan-400/40 to-white/50 border-b-2-silver shadow-lg items-center text-fuchsia-500'>
      <nav>
        <ul className='flex gap-2 text-lg'>
          <li>
            Accueil
          </li>
          <li>
            Truc
          </li>
          <li>
            Truc
          </li>
        </ul>
      </nav>
      <h1 className='text-3xl font-bold'>Loto Quine Freedom</h1>
      <div>
        <SigninButton/>
        <button onClick={handleReset} className='border border-red-500 bg-black text-white p-2'>
          reset tirage pour test
        </button>
      </div>
      
    </header>
      

  )
}
