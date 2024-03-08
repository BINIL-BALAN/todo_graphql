import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  TextField,
  Button,
} from "@mui/material";
interface TodoType {
  id: string;
  description: string;
  __typename: string;
}
import { Fragment, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Tasks_queries } from "./GraphQl/Queries";
import Header from "./Components/Header";
function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { error, loading, data } = useQuery(Tasks_queries);
  useEffect(() => {
    setTodos(data?.todos || []);
  }, [data]);
  return (
    <>
      <Header />
      {loading ? (
        <Typography sx={{ textAlign: "center", padding: "20px" }}>
          {" "}
          Loading.....{" "}
        </Typography>
      ) : (
        <List sx={{ padding: "15px" }}>
          {todos.map((item, index) => (
            <Fragment key={index}>
              <ListItem secondaryAction={<Button color="error">delete</Button>}>
                <ListItemText>
                  {index + 1}. {item?.description}{" "}
                </ListItemText>
              </ListItem>
              <Divider sx={{ backgroundColor: "white" }} />
            </Fragment>
          ))}
        </List>
      )}
    </>
  );
}

export default Todo;
