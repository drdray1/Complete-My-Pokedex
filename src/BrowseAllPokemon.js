import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";

import axios from "axios";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function BrowseAllPokemon() {
  const [loading, setLoading] = useState(true);

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setNextPageUrl(res.data.next);
        setPreviousPageUrl(res.data.previous);
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })
      .then((results) => {
        setLoading(false);
        setPokemon(results.map((p) => p.data));
      });
    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(previousPageUrl);
  }

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
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={previousPageUrl ? gotoPrevPage : null}
      />
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={previousPageUrl ? gotoPrevPage : null}
      />
    </div>
  );
}
