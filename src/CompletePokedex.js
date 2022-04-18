import React from "react";
import axios from "axios";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
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
import CardMedia from "@mui/material/CardMedia";

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
    // "sun",
    // "moon",
    // "ultra-sun",
    // "ultra-moon",
    // "lets-go-pikachu",
    // "lets-go-eevee",
    // "sword",
    // "shield",
  ];
  const [loading, setLoading] = React.useState(true);

  const [regionUrl, setRegionUrl] = React.useState(
    "https://pokeapi.co/api/v2/region"
  );

  const [pokemonUrl, setPokemonUrl] = React.useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [versionUrl, setVersionUrl] = React.useState(
    "https://pokeapi.co/api/v2/version"
  );

  const [pokemonEncounters, setPokemonEncounters] = React.useState([]);
  const [pokemon, setPokemon] = React.useState([]);
  const [pokemonCaught, setPokemonCaught] = React.useState("");
  const [version, setVersion] = React.useState("");

  // const handleMultiLineTextChange = (event) => {
  //   let pc = event.target.value;
  //   setPokemonCaught(pc);
  // };

  // const handleRegionSelectionChange = (event) => {
  //   setRegion(event.target.value);
  // };

  const handleVersionSelectionChange = (event) => {
    setVersion(event.target.value);
  };

  async function getData() {
    setLoading(true);

    // Get the version
    const versionResponse = await axios.get(versionUrl + "/" + version);
    // console.log("Version Group");
    // console.log(versionResponse.data.version_group.url);
    // Get the version group
    const versionGroupResponse = await axios.get(
      versionResponse.data.version_group.url
    );
    // console.log("Version Group First Pokedex");
    // console.log(versionGroupResponse.data.pokedexes[0]);

    // Get pokemon entries in this pokedex
    const pokemonEntriesResponse = await axios.get(
      versionGroupResponse.data.pokedexes[0].url
    );
    // console.log("Pokedex Entries");
    // console.log(pokemonEntriesResponse.data.pokemon_entries);
    // Get their id's
    const pokedexPokemonIds = new Array(
      pokemonEntriesResponse.data.pokemon_entries.length
    );
    for (let idx in pokemonEntriesResponse.data.pokemon_entries) {
      pokedexPokemonIds[idx] = pokemonEntriesResponse.data.pokemon_entries[
        idx
      ].pokemon_species.url
        .toString()
        .split("/")
        .reverse()[1];
    }
    // console.log("Pokedex Pokemon Id's");
    // console.log(pokedexPokemonIds);
    // Follow Pokemon/id url's to store pokemon
    const pokedexPokemon = (
      await Promise.all(
        pokedexPokemonIds.map((id) => axios.get(pokemonUrl + "/" + id))
      )
    ).map((res) => res.data);
    setPokemon(pokedexPokemon);
    // console.log("Pokedex Pokemon");
    // console.log(pokedexPokemon);
    // Follow Pokemon/id/encounters url's to store encounter locations
    const pokemonEncounterUrls = pokedexPokemon.map(
      (p) => p.location_area_encounters
    );
    // console.log("Pokemon Encounter Url's");
    // console.log(pokemonEncounterUrls);

    const pokemonEncounterLocations = (
      await Promise.all(pokemonEncounterUrls.map((url) => axios.get(url)))
    ).map((res) => res.data);
    console.log("Pokemon Encounter Locations");
    console.log(pokemonEncounterLocations);

    // Go through each pokemon's encounter locations and add them to the variable
    var tempEncounterLocations = new Array(pokemon.length);
    for (let idx in pokemonEncounterLocations) {
      var tempStr = "";
      for (let locIdx in pokemonEncounterLocations[idx]) {
        let versionDetails = pokemonEncounterLocations[idx][locIdx].version_details;
        for (let versIdx in versionDetails) {
          if (versionDetails[versIdx].version.name.indexOf(version) !== -1) {
            var name = pokemonEncounterLocations[idx][locIdx].location_area.name;
            name = name[0].toUpperCase() + name.substring(1);
            tempStr = name + ", " + tempStr;
            break;
          }
        }
        // var name = pokemonEncounterLocations[idx][locIdx].location_area.name;
        // name = name[0].toUpperCase() + name.substring(1);
        // tempStr = name + ", " + tempStr;
      }
      tempEncounterLocations[idx] = tempStr.slice(0, -2);
    }
    setPokemonEncounters(tempEncounterLocations);
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Version " + version);
    console.log("Pokemon Caught " + pokemonCaught);

    getData();
  };

  useEffect(() => {
    setLoading(true);
    axios.get(regionUrl).then((res) => {
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Box sx={{ p: 5, width: "50%" }}>
        <Typography variant="h3" component="div">
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
          {/* <FormControl sx={{ m: 2, minWidth: 100 }}>
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
          </FormControl> */}

          <FormControl sx={{ m: 2, minWidth: 100 }}>
            <InputLabel id="version">Version</InputLabel>
            <Select
              labelId="version"
              id="version"
              value={version}
              onChange={handleVersionSelectionChange}
              autoWidth
              label="Version"
            >
              {versions.map((r) => (
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
                <TableCell align="center">Thumbnail</TableCell>
                <TableCell align="center">Name</TableCell>
                {/* <TableCell align="center">Caught</TableCell> */}
                <TableCell align="center">Encounter Location</TableCell>
                <TableCell align="center">Level</TableCell>
              </TableRow>
            </TableHead>
            {typeof pokemon != "undefined" && (
              <TableBody>
                {pokemon.map((p, idx) => (
                  <TableRow
                    key={p.id + "-" + p.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <Typography variant="h6" component="div">
                        {p.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                    <CardMedia
                      component="img"
                      height="50"
                      width="50"
                      // image={
                      //   "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/" +
                      //   p.id +
                      //   ".svg"
                      // }
                      image={
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                        p.id +
                        ".png"
                      }
                      alt={"pokemon_id:" + p.id + "_" + p.name}
                    />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" component="div">
                        {p.name[0].toUpperCase() + p.name.substring(1)}
                      </Typography>
                    </TableCell>
                    {/* <TableCell align="center">{"No"}</TableCell> */}
                    <TableCell align="center">
                      <Typography variant="body1" component="div">
                        {pokemonEncounters[idx]}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" component="div">
                        {p.base_experience}
                      </Typography>
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
