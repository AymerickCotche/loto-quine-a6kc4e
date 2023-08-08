'use client'

import Image from 'next/image'
import SigninButton from './components/SigninButton'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addDrawnNumber, getDraws, getNumbers } from '@/store/features/drawSlice'
import DrawNumber from './components/DrawNumber'
import { pusherClient } from '@/lib/pusher'

export const fetchCache = 'force-no-store'
export const revalidate = 0

export default function Home() {
  const dispatch = useAppDispatch()

  const { draws } = useAppSelector(state => state.draw)

  const latestDraw = draws.length > 0 ? draws[draws.length - 1] : null

  useEffect(() => {
    dispatch(getDraws())
    dispatch(getNumbers())
  }, [dispatch])

  useEffect(() => {
    pusherClient.subscribe('test')

    const numberHandler = (number: string) => {
      dispatch(addDrawnNumber(number))
    }

    pusherClient.bind('number:new', numberHandler)

    return () => {
      pusherClient.unsubscribe('test')
      pusherClient.unbind('number:new', numberHandler)
    }
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
