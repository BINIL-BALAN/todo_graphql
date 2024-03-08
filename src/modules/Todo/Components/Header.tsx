import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        justifyContent: "space-between",
        borderBottom: "1px white solid",
        padding: "10px",
      }}
    >
      <Typography variant="h5">Todo</Typography>
      <div>
        <TextField
          size="small"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            sx: {
              "& fieldset": {
                borderColor: "white !important",
              },
              color: "white",
            },
          }}
          label="Add task"
          color="secondary"
        />
        <Button>Add</Button>
      </div>
    </Box>
  );
}
export default Header;
