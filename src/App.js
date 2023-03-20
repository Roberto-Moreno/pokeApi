//Importación de funciones 

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context/Context";

//Importación de componentes y vistas.
import Navbar from './components/Navbar';
import Home from "./views/Home";
import Pokemones from "./views/Pokemones";
import NotFound from "./views/NotFound";


//Importación de css para casos particulares dentro de los componentes.
import "./assets/css/pokemon.css";

function App() {

  //Definición de estados.
  const [pokemonList, setPokemonList] = useState([]);
  const [nuevaLista, setNuevaLista] = useState([]);


  useEffect(() => {
    //Cargar la lista de Pokemones desde la PokeAPI.
    async function fetchPokemonList() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPokemonList();


  }, []);

  useEffect(() => {
    //Función que genera la dirección de imagen para cada pokemon, según su id dentro de la PokeAPI. 
    const itemsWithCounter = pokemonList.map((item, index) => {
      return {
        ...item,
        counter: index + 1,
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + (index + 1) + '.png',
      };
    });

    //Función que ordena la lista de Pokemones por nombre de forma ascendente.
    const sortedData = itemsWithCounter.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setNuevaLista(sortedData);
  }, [pokemonList]);

  //Generación de la estados globales.
  const globalState = { nuevaLista, setNuevaLista };


  /**
    {selectedPokemon}? 
            <Route path="/Pokemones/:id" element={<Pokemones />} />
            :
            <Route path="/Pokemones/" element={<Pokemones />} />
   */

  return (
    <div className="App">
      <Context.Provider value={globalState}>
        <BrowserRouter basename='/pokeApi'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Pokemones/:id" element={<Pokemones />} />
            <Route path="/Pokemones" element={<Pokemones />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
