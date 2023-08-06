'use client'

import Image from 'next/image'
import SigninButton from './components/SigninButton'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getDraws, getNumbers } from '@/store/features/drawSlice'
import DrawNumber from './components/DrawNumber'

export default function Home() {
  const dispatch = useAppDispatch()

  const { draws } = useAppSelector(state => state.draw)

  const latestDraw = draws.length > 0 ? draws[draws.length - 1] : null

  useEffect(() => {
    dispatch(getDraws())
    dispatch(getNumbers())
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <h1>Loto Quine Freedom</h1>
        <SigninButton/>
      </header>
      <main>
        <div>
          <h2>Historique</h2>
          <div>
            {latestDraw && (
              <div>
                <p>{latestDraw.name}</p>
                <div>
                  {latestDraw.numbers.map((number, index) => (
                    <p key={index}>{number}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2>Tirer ici</h2>
          <DrawNumber/>
        </div>
      </main>
    </div>
  )
}
