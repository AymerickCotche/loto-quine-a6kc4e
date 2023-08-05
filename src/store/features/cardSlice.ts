import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface CardState {
  id: string
  name: string
  session: string
  user: string
  numbers: number[]
}

// Initial state
const initialState: CardState = {
  id: '',
  name: '',
  session: '',
  user: '',
  numbers: []
};

// Actual Slice
export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    
    setCardId(state, action) {
      state.id = action.payload
    },
  },
});

export const { setCardId } = cardSlice.actions


export default cardSlice.reducer