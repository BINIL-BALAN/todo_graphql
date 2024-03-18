import React, { createContext, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { UserDetails } from "./UserContext";
import { taskOperation } from "./Graphql/Mutations";
import { Alert, Snackbar } from "@mui/material";
interface Data {
  id: string;
  task: string;
  status: boolean;
}
export const Operations = createContext({});
export const OperationContext = ({ children }) => {
  const [operationStaus, setOperationStatus] = useState(0);
  const [alertStatus, setAlertStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { user, setUser } = useContext(UserDetails);
  const [taskOperations, { loading, data: resultData }] =
    useMutation(taskOperation);

  async function operations(
   
    operation: "post" | "update" | "delete",
    data: Data
  ) {
    setOperationStatus(0)
    const params = {
      email: user.email,
      operation,
      data,
    };
    try {
      const addResult = await taskOperations({
        variables: {
          params,
        },
      });
      const { result, details } = addResult.data.operations;
      setOperationStatus(result.statusCode);
      if (result.statusCode == 200) {
        // setUser(details);
        setAlertStatus({
          open: true,
          message: result.message,
          severity: "success",
        });
      }
    } catch (error) {
      const { result } = resultData.data.operations;
      setAlertStatus({
        open: true,
        message: result.message,
        severity: "success",
      });
    }
    console.log(resultData);
  }
function handleClose(){
        setAlertStatus({ open: false, message: "", severity: "" });
}
  return (
    <Operations.Provider value={{ operationStaus, operations, loading }}>
      <Snackbar
      sx={{width:"40%"}}
        open={alertStatus.open}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert sx={{width:"100%"}} variant="filled" severity={alertStatus.severity}  onClose={handleClose}>
          {alertStatus.message}
        </Alert>
      </Snackbar>
      {children}
    </Operations.Provider>
  );
};

export default OperationContext;
