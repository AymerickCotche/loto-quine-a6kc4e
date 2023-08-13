import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Types

export interface Session {
  id?: string
  name: string
  date: string
  status: boolean
}

export interface FetchedSession {
  userId: string
  sessionId: string
  session: Session
}

export interface UserForm {
  username: string
  password: string
}

export interface DisplaySlice {
  drawNumberInput: string
  showAddCardModal: boolean
  cardNumberInput: string
  numValuesInput: string[]
  selectedSessionForm : FetchedSession
  userForm: UserForm
  logMessage: string
  sessionForm: Session
}



// AsyncThunk


// Initial state
const initialState: DisplaySlice = {
  drawNumberInput: '',
  showAddCardModal: false,
  cardNumberInput: '',
  numValuesInput: [],
  selectedSessionForm: {
    userId: '',
    sessionId: '',
    session: {
      id: '',
      name: '',
      date: '',
      status: false
    }
  },
  userForm: {
    username: '',
    password: ''
  },
  sessionForm: {
    name: '',
    date: '',
    status: true
  },
  logMessage: ''
};

// Actual Slice
export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDrawNumberInput: (state, action) => {
      state.drawNumberInput = action.payload
    },
    toggleShowAddCardModal(state, action) {
      state.showAddCardModal = !state.showAddCardModal
    },
    setNumValue: (state, action) => {
      const { index, value } = action.payload
      state.numValuesInput[index] = value
    },
    setCardNumber: (state, action) => {
      state.cardNumberInput = action.payload
    },
    setSelectedSessionForm(state, action) {
      state.selectedSessionForm = action.payload
    },
    setLogMessage: (state, action) => {
      state.logMessage = action.payload
    },
    setUserNameInput: (state, action) => {
      state.userForm.username = action.payload
    },
    setUserPasswordInput: (state, action) => {
      state.userForm.password = action.payload
    },
    setSessionNameInput: (state, action) => {
      state.sessionForm.name = action.payload
    },
    setSessionDateInput: (state, action) => {
      state.sessionForm.date = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.logMessage = `Utilisateur ${action.payload.name} bien ajouté`
      })
      .addCase(addUser.rejected, (state, action) => {
        state.logMessage = `Erreur lors de l'enregistrement`
      })
      .addCase(addUser.pending, (state, action) => {
        state.logMessage = `Enregistrement en cours`
      })
      .addCase(addSession.fulfilled, (state, action) => {
        state.logMessage = `Session ${action.payload.name} bien ajouté`
      })
      .addCase(addSession.rejected, (state, action) => {
        state.logMessage = `Erreur lors de l'enregistrement`
      })
      .addCase(addSession.pending, (state, action) => {
        state.logMessage = `Enregistrement en cours`
      })
      
  }
});

export const addUser = createAsyncThunk(
  'display/addCard',
  async (data: UserForm, thunkAPI) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const user = await response.json()
  
    return user
  }
)

export const addSession = createAsyncThunk(
  'display/addSession',
  async (data: Session, thunkAPI) => {
    const response = await fetch('/api/sessions/addone', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const session = await response.json()
  
    return session
  }
)

export const {
  setDrawNumberInput,
  toggleShowAddCardModal,
  setNumValue,
  setCardNumber,
  setSelectedSessionForm,
  setUserNameInput,
  setUserPasswordInput,
  setLogMessage,
  setSessionNameInput,
  setSessionDateInput
} = displaySlice.actions


export default displaySlice.reducer