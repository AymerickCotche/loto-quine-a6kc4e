'use client'

import Image from 'next/image'
import SigninButton from './components/SigninButton'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addDrawnNumber, getDraws, getNumbers, resetNumberDrawn } from '@/store/features/drawSlice'
import DrawNumber from './components/DrawNumber'
import { pusherClient } from '@/lib/pusher'
import GameSession from './components/GameSession'
import Cards from './components/Cards'
import { setDrawn } from '@/store/features/cardSlice'


export default function Home() {
  const dispatch = useAppDispatch()

  const { draws } = useAppSelector(state => state.draw)

  const latestDraw = draws.length > 0 ? draws[draws.length - 1] : null

  const handleReset = () => {
    dispatch(resetNumberDrawn())
  }

  useEffect(() => {
    dispatch(getDraws())
    dispatch(getNumbers())
  }, [dispatch])

  useEffect(() => {
    pusherClient.subscribe('test')

    const numberHandler = async (number: string) => {
      await dispatch(addDrawnNumber(number))
      console.log('here')
      console.log(number)
      await dispatch(setDrawn(number))
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
        <button onClick={handleReset} className='border border-red-500 bg-black text-white p-2'>
          reset tirage pour test
        </button>
      </header>
      <main>
        <div>
          <h2>Dernier tirage</h2>
          <div>
            {latestDraw && (
              <div>
                <p>Tirage : {latestDraw.name}</p>
                <div className='flex gap-2 flex-wrap items-center'>
                  {latestDraw.numbers.map((number, index) => (
                    <div key={index} className={index === latestDraw.numbers.length - 1 ? 'w-12 h-12 bg-yellow-500 rounded-full flex justify-center items-center' : 'w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'}>

                      <p className={index === latestDraw.numbers.length - 1 ? 'text-blue-800 text-3xl font-bold' : 'text-white text-2xl'} >{number}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <GameSession/>
        </div>

        <div>
          <h2>Tirer ici</h2>
          <DrawNumber/>
        </div>
        <div>
          <h2>Cartons</h2>
          <Cards/>
        </div>
      </main>
    </div>
  )
}
