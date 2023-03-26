import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonReducers';

export const store = configureStore({
  reducer: {pokemon: pokemonReducer}
});

export default store;
