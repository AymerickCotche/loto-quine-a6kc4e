import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Type for our state

interface Session {
  id: string
  name: string
}

interface UserWithSession {
  id: string
  name: string
  sessions: Session[]
}

export interface UserState {
  id: string
  name: string
  session: string
  cards: []
  usersWithSession: UserWithSession[]
  selectedUserWithSession: UserWithSession
}

// Initial state
const initialState: UserState = {
  id: '',
  name: '',
  session: '',
  cards: [],
  usersWithSession: [],
  selectedUserWithSession: {
    id: '',
    name: '',
    sessions: []
  }
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
    setSelectedUser(state, action) {
      state.selectedUserWithSession = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersWithSession.fulfilled, (state, action) => {
        state.usersWithSession = action.payload
      })
  }
});

export const { setUserInfos, setSelectedUser } = userSlice.actions

export const getUsersWithSession = createAsyncThunk(
  'user/getUsersWithSession',
  async (_, thunkAPI) => {
    const users = await fetch(`/api/user/getall`,  {
      method: 'GET',
    })
    return users.json()
  }
)

export default userSlice.reducer