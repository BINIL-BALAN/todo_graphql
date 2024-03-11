import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { UserDetails } from "../../../Context/UserContext";
import { Operations } from "../../../Context/OperationContext";
function Header() {
  const { operationStaus, operations, loading } = useContext(Operations);
  const [task, setTask] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(false);

  function handleOnChange(e) {
    setError(false);
    setTask(e.target.value);
  }

  async function handleAddTask() {
    setIsClicked(true);
    if (task != "") {
      operations("post", { id: "", task, status: false });
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if (operationStaus == 200) {
      setTask("");
    }
  }, [operationStaus]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        justifyContent: "space-between",
        // borderBottom: "1px white solid",
        padding: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          onChange={handleOnChange}
          value={task}
          multiline={true}
          rows={2}
          fullWidth
          size="small"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            sx: {
              "& fieldset": {
                borderColor: error ? "red" : "white !important",
              },
              color: "white",
            },
          }}
          label="Add task"
          color="secondary"
          error={error}
          helperText={error ? "Please add task" : ""}
        />
        <Button
          color="success"
          variant="contained"
          onClick={handleAddTask}
          endIcon={ (isClicked &&  loading) && <CircularProgress size={20} sx={{ color: "white" }} />}
        >
          Add
        </Button>
      </div>
    </Box>
  );
}
export default Header;
