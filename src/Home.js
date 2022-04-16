import React from "react";

import ResponsiveAppBar from "./ResponsiveAppBar";
import StickyFooter from "./StickyFooter";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div>
      <Box sx={{ m: 2, flexGrow: 1 }}>
        <Typography variant="h3" component="div">
          Welcome to Complete My Pokedex
        </Typography>
        <Typography variant="p" component="div">
          Missing a few pokemon and need to know where to find the rest? CMP has
          your back!
        </Typography>
      </Box>
    </div>
  );
}
