import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Types


export interface DisplaySlice {
  drawNumberInput: string
}

// AsyncThunk


// Initial state
const initialState: DisplaySlice = {
  drawNumberInput: ''
};

// Actual Slice
export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDrawNumberInput: (state, action) => {
      state.drawNumberInput = action.payload;
    },
  },
});

export const { setDrawNumberInput } = displaySlice.actions


export default displaySlice.reducer