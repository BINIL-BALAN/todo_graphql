import React, { useContext, useEffect, useState } from "react";
import { UserDetails } from "../../Context/UserContext";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { GetUser, AddUser } from "./GraphQl/Mutations";
const Input = ({ label, name, value, setValue }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      size="small"
      fullWidth
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        sx: {
          "& fieldset": {
            borderColor: "white !important",
          },
          color: "white",
        },
      }}
      label={label}
      color="secondary"
    />
  );
};

function Login() {
  const { setUser } = useContext(UserDetails);
  const [alertStatus, setAlertStatus] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState({
    name: "",
    encoded: "",
  });
  const [getUser, { loading }] = useMutation(GetUser);
  const [addUser, { loading: saveLoading }] = useMutation(AddUser);

  async function handleGetUser() {
    try {
      const result = await getUser({
        variables: {
          email: email,
        },
      });
      console.log(result.data.getUser.result);
      if (result.data.getUser.result.statusCode == 200) {
        setUser(result.data.getUser.details);
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.getUser.details)
        );
      } else {
        console.log(result.data.getUser.result.statusCode);
        setAlertStatus({
          show: true,
          severity: "warning",
          message: result.data.getUser.result.message,
        });
      }
    } catch (error) {
      setAlertStatus({
        show: true,
        severity: "error",
        message: "Something went wrong",
      });
    }
  }

  async function handleAddUser() {
    try {
      const result = await addUser({
        variables: {
          user: { id: newEmail, name: newName, email: newEmail, task: [],file },
        },
      });
      console.log(result);
      if (result.data.addUser.statusCode == 200) {
        setAlertStatus({
          show: true,
          severity: "success",
          message: "User added successfully",
        });
      } else {
        setAlertStatus({
          show: true,
          severity: "error",
          message: result.data.addUser.message,
        });
      }
    } catch (error) {
      setAlertStatus({
        show: true,
        severity: "error",
        message: "Something went wrong",
      });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const name = file.name;
    setFile({ encoded:file, name });
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const encoded = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90dvh",
        gap: 20,
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">New user</Typography>
        <Input
          setValue={setNewName}
          value={newName}
          label="Enter name"
          name="name"
        />
        <Input
          setValue={setNewEmail}
          value={newEmail}
          label="Enter email"
          name="email"
        />

        <input type="file" onChange={handleFileChange} />
        <Button
          onClick={handleAddUser}
          fullWidth
          variant="contained"
          endIcon={
            loading && <CircularProgress size={20} sx={{ color: "white" }} />
          }
        >
          Add
        </Button>
      </div>

      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Get task</Typography>
        <Input setValue={setEmail} value={email} label="Email" name="email" />
        <Button
          onClick={handleGetUser}
          fullWidth
          variant="contained"
          color="success"
        >
          get
        </Button>
      </div>
      <Snackbar
        sx={{ width: "40%" }}
        open={alertStatus.show}
        autoHideDuration={2000}
        onClose={() => {
          setAlertStatus({
            ...alertStatus,
            show: false,
          });
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          sx={{ width: "100%" }}
          variant="filled"
          severity={alertStatus.severity}
        >
          {alertStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
