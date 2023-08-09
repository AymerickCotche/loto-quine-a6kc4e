import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface Session {
  id: string
  name: string
  date: string
  status: boolean
}

export interface FetchedSession {
  userId: string
  sessionId: string
  session: Session
}

export interface SessionState {
  sessions: FetchedSession[]
  selectedSession: FetchedSession
}

type UserId = string

export const setGameSessions = createAsyncThunk(
  'session/setGameSessions',
  async (userId: UserId, thunkAPI) => {
    const sessions = await fetch(`/api/sessions`,  {
      method: 'POST',
      body: JSON.stringify({userId})
    })
    return sessions.json()
  }
)

// Initial state
const initialState: SessionState = {
  sessions: [],
  selectedSession: {
    userId: '',
    sessionId: '',
    session: {
      id: '',
      name: '',
      date: '',
      status: false
    }
  }
};

// Actual Slice
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    
    setSessionId(state, action) {
      state.sessions = action.payload
    },
    setSelectedSession(state, action) {
      state.selectedSession = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setGameSessions.fulfilled, (state, action) => {
        state.sessions = action.payload
      })
  }
});

export const { setSessionId, setSelectedSession } = sessionSlice.actions


export default sessionSlice.reducer