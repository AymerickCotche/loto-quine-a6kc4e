'use client'
import {setSessionCards } from '@/store/features/cardSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
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
    <div>
      <div className='flex gap-4 items-center'>
        <h2 className='font-bold text-xl'>Cartons</h2> 
      </div>
      {selectedSession.sessionId &&
        
        <div className='flex gap-2 flex-wrap'>
            {reversedSortedCards.map(card => (
              <Card card={card} key={card.id}/>
            ))}
        </div>
      }

      {!selectedSession.sessionId && 
        <div>
          <p>Sélectionnez une session pour voir vous cartons</p>
        </div>
      }
    </div>
  )
  
}

export default Cards
