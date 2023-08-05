import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface SessionState {
  id: string
  name: string
  date: string
  status: boolean
}

// Initial state
const initialState: SessionState = {
  id: '',
  name: '',
  date: '',
  status: false
};

// Actual Slice
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    
    setSessionId(state, action) {
      state.id = action.payload
    },
  },
});

export const { setSessionId } = sessionSlice.actions


export default sessionSlice.reducer