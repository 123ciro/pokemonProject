import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const url = "https://api.pokemontcg.io/v1/cards";

class App extends Component {
  state = {
    pokemonName: "",
    data: [],
  };

  updatePokemonName = this.updatePokemonName.bind(this);
  searchPokemon = this.searchPokemon.bind(this);

  //peticion get para traer todos los pokemones
  getPokemon = () => {
    axios.get(url).then((response) => {
      this.setState({ data: response.data.cards });
    });
  };

  //Evento al comenzar un componente y realiza la busqueda de todos los pokemones
  componentDidMount() {
    this.getPokemon();
  }

  //Actualiza el valor del pokemon
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
                    <Button> Details </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
  }
}

export default App;
