import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface DrawState {
  id: string
  name: string
  numbers: number[]
}

// Initial state
const initialState: DrawState = {
  id: '',
  name: '',
  numbers: []
};

// Actual Slice
export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    
    setDrawId(state, action) {
      state.id = action.payload
    },
  },
});

export const { setDrawId } = drawSlice.actions


export default drawSlice.reducer