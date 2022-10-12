import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SingleCountryType = {
  name: string;
  region: string;
  population: number;
  capital: string;
  flags: string;
};
export type countryDataType = SingleCountryType[];

export interface AppState {
  countryData: countryDataType;
  isError: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  countryData: [
    {
      name: "",
      region: "",
      population: 0,
      capital: "",
      flags: "",
    },
  ],

  isError: false,
  isLoading: false,
};

const GlobalSlice = createSlice({
  name: "GlobalState",
  initialState,
  reducers: {
    setCountryData: (state, action: PayloadAction<countryDataType>) => {
      state.countryData = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCountryData, setIsError, setIsLoading } = GlobalSlice.actions;

export const store = configureStore({
  reducer: {
    GlobalState: GlobalSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
