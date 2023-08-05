import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '@/store/features/sessionSlice'
import userReducer from '@/store/features/userSlice'
import cardReducer from '@/store/features/cardSlice'
import drawReducer from '@/store/features/drawSlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    card: cardReducer,
    draw: drawReducer
  },
  devTools: process.env.VERCEL_ENV !== "production",
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch