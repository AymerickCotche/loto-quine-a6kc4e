'use client'
import { setDrawn, setSessionCards } from '@/store/features/cardSlice'
import { setGameSessions } from '@/store/features/sessionSlice'
import { setUserInfos } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Card from './Card'

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
      <div className='flex gap-2 flex-wrap'>
          {reversedSortedCards.map(card => (
            <Card card={card} key={card.id}/>
          ))}
      </div>
    )
  
}

export default Cards
