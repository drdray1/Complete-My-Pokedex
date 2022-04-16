import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function PokemonList({ pokemon }) {
  return (
    <div>
      <Box sx={{ m: 2, flexGrow: 1 }}>
        <Grid container spacing={2}>
          {pokemon.map((p) => (
            <Grid item xs={12} md={6} lg={3} xl={1} key={p.id}>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent>
                    <Typography variant="p" component="div">
                      Id: {p.id}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="200"
                      width="200"
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
                    <Typography variant="h5" component="div">
                      {p.name[0].toUpperCase() + p.name.substring(1)}
                    </Typography>
                    <Button href={p.location_area_encounters}>
                      Encounter Locations
                    </Button>
                  </CardContent>
                </React.Fragment>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
