import React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          {gotoPrevPage && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackIosNewRoundedIcon />}
              onClick={gotoPrevPage}
            >
              Previous
            </Button>
          )}
          {gotoNextPage && (
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosRoundedIcon />}
              onClick={gotoNextPage}
            >
              Next
            </Button>
          )}
        </Stack>
      </Box>
    </div>
  );
}
