import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonEntry } from '../types/pokemon';

export interface PokemonState {
  entries: PokemonEntry[];
  currentPage: number;
}

const initialState: PokemonState = {
  entries: [],
  currentPage: 1,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setEntries(state, action: PayloadAction<PokemonEntry[]>) {
      state.entries = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setEntries, setCurrentPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;