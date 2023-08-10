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

    <header className='flex justify-between p-10 bg-gradient-to-b from-black/40 to-cyan-400/30 border-b-2-silver shadow-lg'>
      <nav>
        <ul className='flex gap-2'>
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
      <h1>Loto Quine Freedom</h1>
      <div>
        <SigninButton/>
        <button onClick={handleReset} className='border border-red-500 bg-black text-white p-2'>
          reset tirage pour test
        </button>
      </div>
      
    </header>
      

  )
}
