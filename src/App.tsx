import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEntries, setCurrentPage, PokemonState } from "./store/pokemonReducers";
import {PokemonEntry} from  './types/pokemon';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const entries = useSelector((state:{pokemon: PokemonState}) => state.pokemon.entries);
  const currentPage = useSelector((state:{pokemon: PokemonState}) => state.pokemon.currentPage);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokedex/2')
      .then(res => res.json())
      .then(res => {
        const entries: PokemonEntry[] = res.pokemon_entries.map((entry: PokemonEntry, index: number) => ({...entry, entry_number: index + 1}));
        dispatch(setEntries(entries));
      })
      .catch(err => console.error(err));
  }, [dispatch]);

  const indexOfLastPokemon = currentPage * 10;
  const indexOfFirstPokemon = indexOfLastPokemon - 10;
  const currentPokemon = entries.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div>
      {currentPokemon.map(pokemon => <div key={pokemon.entry_number}>{pokemon.pokemon_species.name}</div>)}
      <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === Math.ceil(entries.length / 10)}>Next</button>
    </div>
  );
}

export default App;