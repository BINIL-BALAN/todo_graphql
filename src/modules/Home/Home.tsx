import { useContext, useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import Login from "../Login/Login";
import { UserDetails } from "../../Context/UserContext";
import { Avatar, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GetUser } from "../Login/GraphQl/Mutations";
import { baseUrl } from "../../constant";
function Home() {
  const [isPresent, setIsPresent] = useState(false);
  const { user, setUser } = useContext(UserDetails);
  function handleLogout() {
    setUser(undefined);
    localStorage.clear();
  }
  const [getUser, { loading }] = useMutation(GetUser);
  async function CheckUser() {
    let details;
    const storedData = localStorage.getItem("user");
    if (storedData) {
      try {
        details = JSON.parse(storedData);
        const result = await getUser({
          variables: {
            email: details?.email,
          },
        });
        setUser(result.data.getUser.details);
      } catch (error) {
        console.error("Error parsing user details:", error);
      }
    }
  }
  useEffect(() => {
    CheckUser();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid white",
        }}
      >
        <Typography variant="h5" sx={{ padding: "10px" }}>
          {user && (
            <IconButton onClick={handleLogout} sx={{ color: "white" }}>
              &#129152;
            </IconButton>
          )}{" "}
          Todo
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            marginRight:"5%"
          }}
        >
          <Tooltip title={user?.email}>
            <Avatar sx={{cursor:"pointer"}} src={baseUrl + user?.image} alt={user?.name} />
          </Tooltip>
          <Typography>{user?.name}</Typography>
          {/* <Typography>{user?.email}</Typography> */}
        </div>
      </div>
      {user ? <Todo /> : <Login />}
    </>
  );
}

export default Home;
