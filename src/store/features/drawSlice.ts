import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Pusher from "pusher-js"
import { json } from "stream/consumers"

export interface Number {
  id: string,
  value: string,
  drawn: boolean
}
// Types
export interface Draw {
  id: string
  name: string
  numbers: string[]
}

export interface DrawState {
  draws: Draw[]
  allnumbers: Number[]
}

export interface dataObj {
  drawId: string
  numberId: string
  numberValue: string
}

// AsyncThunk

export const getDraws = createAsyncThunk(
  'draw/getDraws',
  async (_, thunkAPI) => {
    const draws = await fetch('/api/draws')
    return draws.json()
  }
)

export const getNumbers = createAsyncThunk(
  'draw/getNumbers',
  async (_, thunkAPI) => {
    const numbers = await fetch('/api/numbers')
    return numbers.json()
  }
)

export const updateDraws = createAsyncThunk(
  'draw/updateDraws',
  async (data: dataObj, thunkAPI) => {
    const response = await fetch('/api/draws/update', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const draw = await response.json()
    // const responsePusher = await fetch('/api/pusher', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     message: draw.numberValue
    //   })
    // })
    return draw
  }
)

// Initial state
const initialState: DrawState = {
  draws: [],
  allnumbers: []
};

// Actual Slice
export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    addDrawnNumber: (state, action) => {
      state.draws[state.draws.length - 1].numbers.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDraws.fulfilled, (state, action) => {
        state.draws = action.payload
      })
      .addCase(getNumbers.fulfilled, (state, action) => {
        state.allnumbers = action.payload
      })
      .addCase(updateDraws.fulfilled, (state, action) => {
        
      })
  }
});

export const { addDrawnNumber } = drawSlice.actions


export default drawSlice.reducer