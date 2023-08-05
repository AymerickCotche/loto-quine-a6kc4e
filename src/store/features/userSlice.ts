import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface UserState {
  id: string
  name: string
  session: string
  card: []
}

// Initial state
const initialState: UserState = {
  id: '',
  name: '',
  session: '',
  card: [],
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    setUserId(state, action) {
      state.id = action.payload
    },
  },
});

export const { setUserId } = userSlice.actions


export default userSlice.reducer