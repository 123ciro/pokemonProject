import React, { Component, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const url = "https://api.pokemontcg.io/v1/cards";

class App extends Component {
  state = {
    pokemonName: "",
    data: [],
    dataPokemon: [],
    showModal: false,
  };

  updatePokemonName = this.updatePokemonName.bind(this);
  searchPokemon = this.searchPokemon.bind(this);

  //Evento al comenzar un componente y realiza la busqueda de todos los pokemones
  componentDidMount() {
    this.getPokemon();
  }

  //peticion get para traer todos los pokemones
  getPokemon = () => {
    axios.get(url).then((response) => {
      this.setState({ data: response.data.cards });
    });
  };

  //Actualiza el valor del pokemon que se escribe para buscar
  updatePokemonName(event) {
    this.setState({ pokemonName: event.target.value });
  }

  //Se recupera el valor del input y se busca el pokemon
  searchPokemon() {
    console.log("Nombre del Pokemon: " + this.state.pokemonName);
    const valueUrl = url + "?name=" + this.state.pokemonName;
    console.log("Url filtrando ", valueUrl);

    axios.get(valueUrl).then((response) => {
      console.log("Valores", response.data.cards);
      this.setState({ data: response.data.cards });
    });
  }

  //se muestra el valor del pokemon por Id
  pokemonById(value) {
    console.log("Id del Pokemon: " + value);
    const valueUrl = url + "?id=" + value;

    axios.get(valueUrl).then((response) => {
      console.log("Valores", response.data.cards);
      this.setState({ dataPokemon: response.data.cards });
    });
  }

  //para poder mostrar el modal con los detalles del pokemon
  showModalDetails(value) {
    this.setState({ showModal: !this.state.showModal });
    if (!this.state.showModal) {
      console.log("Se abre modal");
      console.log(value);
      this.pokemonById(value);
    } else {
      console.log("Se cierra modal");
    }
  }

  render() {
    return (
      <div
        style={{
          alignItems: "center",
          textAlign: "center",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
        <h2>Pokemon List</h2>
        <input
          placeholder="Type a name..."
          value={this.state.pokemonName}
          onChange={this.updatePokemonName}
        ></input>
        <Button onClick={this.searchPokemon} style={{ marginLeft: "10px" }}>
          Search
        </Button>

        <Table style={{ marginTop: "10px" }} striped bordered hover>
          <thead>
            <tr>
              <th>Look</th>
              <th>Name</th>
              <th> </th>
            </tr>
          </thead>

          {this.state.data.map((pokemon) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <img
                      style={{ height: "200px" }}
                      src={pokemon.imageUrl}
                    ></img>
                  </td>
                  <td>{pokemon.name}</td>
                  <td>
                    <Button onClick={() => this.showModalDetails(pokemon.id)}>
                      Details
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>

        <Modal show={this.state.showModal}>
          <Modal.Header>
            <h2 style={{ fontWeight: "bold" }}>Pokemon Details</h2>
          </Modal.Header>
          <Modal.Body>
            {this.state.dataPokemon.map((pokemon) => {
              return (
                <table>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Name: </span>
                    <span>{pokemon.name}</span>
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Number: </span>
                    <span>{pokemon.nationalPokedexNumber}</span>
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Rarity: </span>
                    <span>{pokemon.rarity}</span>
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Series: </span>
                    <span>{pokemon.series}</span>
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Super Type: </span>
                    <span>{pokemon.supertype}</span>
                  </p>
                </table>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.showModalDetails()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
