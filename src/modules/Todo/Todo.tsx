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
import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { get_tasks} from "./GraphQl/Queries";
import { UserDetails } from "../../Context/UserContext";
import Header from "./Components/Header";
import { Operations } from "../../Context/OperationContext";
import SubComponent from "./Components/SubComponent";
import { useSubscription } from '@apollo/client';
import { subscription_task } from "./GraphQl/Mutations";
function Todo() {
  const { operations, loading} = useContext(Operations)
  const {user} = useContext(UserDetails)
  const [tasks,setTasks] = useState([])
  const {data} = useQuery(get_tasks,{
    variables:{
      email:user?.email || ""
    }
  })
function handleChangeStatus(task){
   console.log(task);
   delete task.__typename
   operations("update",task)   
}

function handleDelete(task){
   console.log(task);
   delete task.__typename
   operations("delete",task)   
}
const {data:userData} = useSubscription(subscription_task)

useEffect(()=>{
  setTasks(userData?.updations?.details.task);
},[userData])

useEffect(()=>{
  setTasks(user.task)
},[user.task])
  return (
    <>
      <Header />  
      {loading ? (
        <Typography sx={{ textAlign: "center", padding: "20px" }}>
          {" "}
          Loading.....{" "}
        </Typography>
      ) : (
        <List sx={{ padding: "15px",maxHeight:"74dvh" ,overflowY:"auto"}}>
          {tasks?.map((item, index) => (
            <Fragment key={index}>
              <ListItem secondaryAction={<div style={{display:"flex",gap:"5px"}}> {item.status ? <strong style={{color:"green"}}>Completed</strong> : <Button size="small" color={"success"} variant="contained" onClick={()=>{handleChangeStatus(item)}} > done </Button>} <Button onClick={()=>{handleDelete(item)}} size="small" color="error" variant="contained">delete</Button> </div>}>
                <ListItemText secondary={ item.status ? "" : <span style={{color:"orange" }}> Pending</span>}>
                  {index + 1}. {item?.task}{" "}
                </ListItemText>
              </ListItem>
              <Divider sx={{ backgroundColor: "white" }} />
            </Fragment>
          ))}
        </List>
      )}
      {tasks?.length == 0 && <Typography sx={{textAlign:"center",padding:"10px"}}>Empty task</Typography>}
    </>
  );
}

export default Todo;
