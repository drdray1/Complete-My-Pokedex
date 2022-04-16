import React from "react";
import axios from "axios";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect } from "react";

export default function CompletePokedex() {
  const versions = [
    "red",
    "blue",
    "yellow",
    "gold",
    "silver",
    "crystal",
    "ruby",
    "sapphire",
    "emerald",
    "firered",
    "leafgreen",
    "diamond",
    "pearl",
    "platinum",
    "heartgold",
    "soulsilver",
    "black",
    "white",
    "colosseum",
    "xd",
    "black-2",
    "white-2",
    "x",
    "y",
    "omega-ruby",
    "alpha-sapphire",
    "sun",
    "moon",
    "ultra-sun",
    "ultra-moon",
    "lets-go-pikachu",
    "lets-go-eevee",
    "sword",
    "shield",
  ];
  const [loading, setLoading] = React.useState(true);

  const [regions, setRegions] = React.useState([]);

  const [regionUrl, setRegionUrl] = React.useState(
    "https://pokeapi.co/api/v2/region"
  );
  const [pokedexUrl, setPokedexUrl] = React.useState(
    "https://pokeapi.co/api/v2/pokedex"
  );
  const [pokemonUrl, setPokemonUrl] = React.useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [pokemonEncounters, setPokemonEncounters] = React.useState([]);
  const [pokemon, setPokemon] = React.useState([]);
  const [pokedex, setPokedex] = React.useState({});
  const [pokemonCaught, setPokemonCaught] = React.useState("");
  const [region, setRegion] = React.useState("");

  const handleMultiLineTextChange = (event) => {
    let pc = event.target.value;
    setPokemonCaught(pc);
  };

  const handleRegionSelectionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Region " + region);
    console.log("Pokemon Caught " + pokemonCaught);

    setLoading(true);
    axios
      .get(pokedexUrl + "/" + region)
      .then((res) => {
        var tempPokedex = res.data;
        // console.log(tempPokedex);
        setPokedex(tempPokedex);
        return tempPokedex;
      })
      .then((results) => {
        return Promise.all(
          results.pokemon_entries.map((p) =>
            axios.get(pokemonUrl + "/" + p.entry_number)
          )
        );
      })
      .then((results) => {
        let tempPokemon = results.map((res) => res.data);
        // console.log(tempPokemon);
        setPokemon(tempPokemon);
        return tempPokemon;
      })
      .then((results) => {
        return Promise.all(
          results.map((p) => axios.get(p.location_area_encounters))
        );
      })
      .then((results) => {
        var tempEncounters = results.map((res) => res.data);
        for (let i = 0; i < tempEncounters.length; i++) {
          var location = "";
          if (tempEncounters[i].length > 0) {
            var locationString = "";
            for (let j = 0; j < tempEncounters[i].length; j++) {
              locationString =
                tempEncounters[i][j]["location_area"]["name"] +
                ", " +
                locationString;
            }
            location = locationString;
          } else {
            location = "unknown";
          }
          tempEncounters[i] = location;
          console.log(tempEncounters[i]);
        }
        setPokemonEncounters(tempEncounters);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(regionUrl).then((res) => {
      var tempRegions = res.data.results.map((r) => r.name);
      // console.log(tempRegions);
      setRegions(tempRegions);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Box sx={{ p: 5, width: "50%" }}>
        <Typography variant="h2" component="div">
          Loading...
        </Typography>
        <LinearProgress />
      </Box>
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          component="div"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 2, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 2, minWidth: 100 }}>
            <InputLabel id="region">Region</InputLabel>
            <Select
              labelId="region"
              id="region"
              value={region}
              onChange={handleRegionSelectionChange}
              autoWidth
              label="Region"
            >
              {regions.map((r) => (
                <MenuItem value={r} key={r}>
                  {r[0].toUpperCase() + r.substring(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
            id="outlined-multiline-flexible"
            label="Caught Pokemon ID's"
            multiline
            maxRows={4}
            value={pokemonCaught}
            onChange={handleMultiLineTextChange}
          /> */}
        </Box>
        <Box sx={{ m: 2 }}>
          <Button variant="contained" type="submit">
            Complete Pokedex
          </Button>
        </Box>
      </form>

      <Box sx={{ m: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                {/* <TableCell align="center">Caught</TableCell> */}
                <TableCell align="center">Encounter Location</TableCell>
                <TableCell align="center">Level</TableCell>
              </TableRow>
            </TableHead>
            {typeof pokemon != "undefined" && (
              <TableBody>
                {pokemon.map((p) => (
                  <TableRow
                    key={p.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {p.id}
                    </TableCell>
                    <TableCell align="center">
                      {p.name[0].toUpperCase() + p.name.substring(1)}
                    </TableCell>
                    {/* <TableCell align="center">{"No"}</TableCell> */}
                    <TableCell align="center">
                      {pokemonEncounters[p.id - 1]}
                    </TableCell>
                    <TableCell align="center">
                      {p.stats[0]["base_stat"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
