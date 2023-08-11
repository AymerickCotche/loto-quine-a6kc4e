'use client'

import Image from 'next/image'
import SigninButton from '@/app/components/SigninButton'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addDrawnNumber, getDraws, getNumbers, resetNumberDrawn } from '@/store/features/drawSlice'
import DrawNumber from '@/app/components/DrawNumber'
import { pusherClient } from '@/lib/pusher'
import GameSession from '@/app/components/GameSession'
import Cards from '@/app/components/Cards'
import { setDrawn } from '@/store/features/cardSlice'
import Header from './components/Header'
import { signIn } from 'next-auth/react'
import FormAddCard from './components/FormAddCard'

export default function Home() {
  const dispatch = useAppDispatch()

  const { draws } = useAppSelector(state => state.draw)

  const { id } = useAppSelector(state => state.user)
  const { name } = useAppSelector(state => state.user)
  const { showAddCardModal } = useAppSelector(state => state.display)

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
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className='mt-4 p-5 min-h-full'>
        <div className='flex-col md:flex-row'>
          <div className='flex-1'>
            <h2 className='text-3xl font-semibold text-blue-800 text-center'>Bienvenue sur le suivi Loto Quine Freedom en temps réel</h2>
            <div className='mb-4'>
              {latestDraw && (
                <div>
                  <p className='text-lg font-semibold mb-2'>Tirage en cours : {latestDraw.name}</p>
                  <div className='flex gap-2 flex-wrap items-center bg-gradient-to-br from-fuchsia-600 to-green-400 p-5 rounded-2xl'>
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
                             
        </div>

        {id &&
          <div>
            <div>

              <div className='mb-2'>
                <GameSession/>
              </div>

              {name === 'test' &&
              
                <div>
                  <h2>Zone de tirage</h2>
                  <DrawNumber/>
                </div>
              }

            </div>

            <div>
              
              <Cards/>
            </div>

          </div>
        }

        {!id &&
          <div className='text-center' onClick={() => signIn()}>
            <p className='text-4xl text-center mt-40 font-bold text-pink-600 border border-red-700 p-8 rounded-xl inline-block mx-auto hover:bg-green-300 duration-1000 hover:cursor-pointer'>Veuillez vous connecter afin de pouvoir suivre vos cartons</p>
          </div>
        }
          
        {!showAddCardModal &&
          <FormAddCard/>
        }
        
      </main>
    </div>
  )
}
