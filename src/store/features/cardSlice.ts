import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Type for our state

export interface NumberType {
  id: string
  value: string
  drawn: boolean
}

export interface User {
  id: string
  name: string
}
export interface CardNumber {
  cardId: string
  numberId: string
  number: NumberType
}
export interface Card {
  id: string
  name: string
  session: string
  user: User
  drawnNumber: number
  numbers: CardNumber[]
}

export interface CardState {
  cards: Card[]
}

type SessionId = string

export const setSessionCards = createAsyncThunk(
  'session/setSessionCards',
  async (sessionId: SessionId, thunkAPI) => {
    const cards = await fetch(`/api/cards`,  {
      method: 'POST',
      body: JSON.stringify({sessionId})
    })
    return cards.json()
  }
)

// Initial state
const initialState: CardState = {
  cards: []
};

// Actual Slice
export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    
    setCardId(state, action) {
      state.cards = action.payload
    },
    setDrawn(state, action) {

      for (const card of state.cards) {
        for (const cardNumber of card.numbers) {
          if (cardNumber.number.value == action.payload) {
            cardNumber.number.drawn = true
          }
        }  
      }
      
    }
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSessionCards.fulfilled, (state, action) => {
        state.cards = action.payload
      })
  }
});

export const { setCardId, setDrawn } = cardSlice.actions


export default cardSlice.reducer