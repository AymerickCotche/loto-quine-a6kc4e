import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Types

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

export interface DisplaySlice {
  drawNumberInput: string
  showAddCardModal: boolean
  cardNumberInput: string
  numValuesInput: string[]
  selectedSessionForm : FetchedSession
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
  }
};

// Actual Slice
export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDrawNumberInput: (state, action) => {
      state.drawNumberInput = action.payload;
    },
    toggleShowAddCardModal(state, action) {
      state.showAddCardModal = !state.showAddCardModal
    },

    setNumValue: (state, action) => {
      const { index, value } = action.payload;
      state.numValuesInput[index] = value;
    },
    setCardNumber: (state, action) => {
      state.cardNumberInput = action.payload;
    },
    setSelectedSessionForm(state, action) {
      state.selectedSessionForm = action.payload
    },
  },
});

export const addNewCard = createAsyncThunk(
  'quine/addNewCard',
  async (data, thunkAPI) => {
    const tirages = await fetch('/api/cards/addone', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return tirages.json()
  }
)

export const { setDrawNumberInput, toggleShowAddCardModal, setNumValue, setCardNumber, setSelectedSessionForm } = displaySlice.actions


export default displaySlice.reducer