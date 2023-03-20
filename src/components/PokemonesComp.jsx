import React, { useState, useContext, useEffect } from 'react';
import Context from "../Context/Context"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import "../assets/css/pokemon.css";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function PokemonList() {

  //Definición de estados
  const { id } = useParams();
  const { nuevaLista} = useContext(Context);

  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [nuevaMatriz, setNuevaMatriz] = useState([]);
  const [errores, setErrores] = useState(false);
  const navigate = useNavigate();

  //Captura de datos de Pokemón seleccionado.
  //En el caso que se busque un pokemón que no existe en la lista, se marca el estado errores como verdadero y se imprime un mensaje que informa que no existe. 
  useEffect(() => {
    async function fetchPokemonData() {
      if (id) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          setPokemonData(data['stats']);
        } catch (error) {
          setErrores(true);
          console.error(error);

        }
      }
    }
    fetchPokemonData();
  }, [id]);

  //Captura de estadísticas del Pokemon seleccionado
  useEffect(() => {
    const nueva = pokemonData.map((producto1, index) => ({
      id: index,
      stats: producto1.stat.name,
      base: producto1.base_stat,
    }));
    setNuevaMatriz(nueva);
  }, [pokemonData, id]);

  //Redirigir al usuario a a través del hook useNavigate 
  const handleViewDetails = (event) => {
    event.preventDefault();
    navigate(`/Pokemones/${selectedPokemon}`);
  }

  //Función que permite imprimir el nombre del Pokemón en pantalla como título a través de un filtro.
  const imprimirNombre = () => {
    const filteredUsers = nuevaLista.filter(lista => lista.name.toString() === id.toString());
    const arreglo =
      filteredUsers.map((productox, index) => {
        return (
          <h1 key={index}>{productox.name.toUpperCase()}</h1>
        )
      });
    return arreglo;
  }

  //Función que permite imprimirna foto del Pokemón seleccionado a través de un filtro.
  const imprimir_foto = () => {
    
    let filteredUsers;
    let variable;

    //Condicional que se usa en caso de que se ingrese un número como Pokemón y no su nombre
    if (!isNaN(id)) { // Comprobamos si la variable es un número
      variable = Number(id); // Convertimos la variable a un número
    } else {
      variable = String(id); // Convertimos la variable a una cadena de texto
    }
    
    if (Number.isInteger(variable)) {
      filteredUsers = nuevaLista.filter(lista => lista.counter.toString() === id.toString());
    }
    else {
      filteredUsers = nuevaLista.filter(lista => lista.name.toString() === id.toString());
    }
    console.log(typeof variable);
    console.log("Filtrado: ", filteredUsers);

    const arreglo =
      filteredUsers.map((productox, index) => {
        return (
          <img key={index} className='peque' src={productox.url} alt="foto"></img>
        )
      });
    return arreglo;
  }

  //Función que permite imprimir el listado de estadísticas. 
  const imprimirEstadisticas = () => {
    const arreglo =
      nuevaMatriz.map((productox, index) => (
        <li className='letra' key={index}>{productox.stats}{':'} {productox.base}</li>
      ));

    return arreglo;
  }

  //seteo de Pokemón seleccionado en caso de recargar la página y se pierda el id 

    //seteo de Pokemón seleccionado en caso de recargar la página y se pierda el id 
  useEffect(() => {
    if (id) setSelectedPokemon(id);
  }, [id]);

  console.log('Lista Pokemona: ', nuevaLista);
  console.log('Estadísticas pokemonas: ', pokemonData);
  console.log('Pokemon seleccionado: ', selectedPokemon);
  console.log('id: ', id);

  const regresar = (event) => {
    event.preventDefault();
    navigate(`/Pokemones`);
  }
  //Función que permite imprimir en pantalla todos los datos del Pokemón seleccionado a través de cards de Bootstrap.
  const imprimirProcesado = () => {
    if (errores === true) {
      return (<h1>No existe <span className='errores'>{id}</span> en la base de datos.</h1>);
    }
    else {
      return (
        <>
          <Container className='container-fluid'>
            <Row >
              <Col >{imprimirNombre()}</Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg >
                <Card className='h-100 card-transparent2 border border-danger rounded border-3'>
                  <Card.Body className="text-left" >
                    <Card.Text className="text-left">
                      {imprimir_foto()}
                    </Card.Text>

                  </Card.Body>
                </Card>
              </Col>
              <Col lg>
                <Card className='h-100 card-transparent4 border border-danger rounded border-3'>
                  <Card.Body >
                    <Card.Text>
                      {imprimirEstadisticas()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <div>
        <Button variant='primary' className='my-2 btn btn-warning m-1 p-2' onClick={regresar}><h3>Regresar</h3></Button>
      </div>
        </>
      )
    }
  }
  //Función que permite imprimir el selector para elegir un Pokemón de la lista obtenida desde la PokeAPI. 
  const imprimirSelect = () => {
    return (
      <>
        <h1 className="p-3" >Seleccionar un Pokemón de la siguiente lista:</h1>
        <Container className='container-fluid'>
          <Row className="justify-content-center">
            <Col lg >
              <Card className='h-100 card-transparent5'>
                <Card.Body className="text-center" >
                  <div>
                    <select className="form-select form-select-lg mb-3 p-3" aria-label="form-select-lg example" value={selectedPokemon} onChange={(event) => setSelectedPokemon(event.target.value)} >
                      <option value="" defaultValue disabled>Listado de Pokemones</option>
                      {nuevaLista.map((pokemon, index) => (
                        <option key={index} value={pokemon.name}>{pokemon.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button className="btn btn-warning m-2 p-3 " onClick={handleViewDetails}><h3>Ver detalles</h3></button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }


  //Si existe un id (nombre de un Pokemón seleccionado) se imprimen los datos del Pokemón, si no existe el id se imprime el selector. 
  return (
    <div className="d-block text-center">
      {(id) ? imprimirProcesado() : imprimirSelect()}
      
    </div>
  );
}

export default PokemonList;
