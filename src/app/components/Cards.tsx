'use client'
import { setDrawn, setSessionCards } from '@/store/features/cardSlice'
import { setGameSessions } from '@/store/features/sessionSlice'
import { setUserInfos } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import _ from 'lodash'

const Cards = () => {
  const dispatch = useAppDispatch()

  const {selectedSession} = useAppSelector(state => state.session)
  const {cards} = useAppSelector(state => state.card)
  const { draws } = useAppSelector(state => state.draw)

  const sortedCards = _.sortBy(cards, card =>
    _.sumBy(card.numbers, 'number.drawn')
  );

  const reversedSortedCards = _.reverse(sortedCards);
  
  useEffect(() => {
    if(selectedSession) {
      
      dispatch(setSessionCards(selectedSession.sessionId))
    }
  }, [selectedSession, dispatch])
    return (
      <div>
          {reversedSortedCards.map(card => (
            <div key={card.id}>
              <p>Numéro du carton : {card.name}</p>
              <p>Nom du propiétaire de la carte : {card.user.name}</p>
              <div className='grid grid-cols-5'>
                {card.numbers.map(number => (
                  <span key={number.number.value} className={number.number.drawn ? 'bg-green-200' : ''}>{number.number.value}</span>
                ))}
              </div>
            </div>
          ))}
      </div>
    )
  
}

export default Cards
