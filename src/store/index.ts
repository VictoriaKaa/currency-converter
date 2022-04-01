import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./features/currencies";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>