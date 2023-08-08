import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface UserState {
  id: string
  name: string
  session: string
  cards: []
}

// Initial state
const initialState: UserState = {
  id: '',
  name: '',
  session: '',
  cards: [],
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    setUserInfos(state, action) {
      state.id = action.payload.id
      state.name = action.payload.name
    },
  },
});

export const { setUserInfos } = userSlice.actions


export default userSlice.reducer