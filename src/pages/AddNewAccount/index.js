import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertedNewClient, registerClient } from "../../store/authSlice";
import addNotification from "react-push-notification";

const AddNewAccount = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isRegisteringClient, registeringClientError, newRegisteredClient } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (newRegisteredClient) {
      addNotification({
        title: "Registered Successfully!",
        subtitle: "Registered",
        message: `username: ${newRegisteredClient.username}`,
        native: true,
      });
      dispatch(alertedNewClient());
    }
  }, [newRegisteredClient, dispatch]);

  const registerHandle = (e) => {
    e.preventDefault();

    dispatch(registerClient({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={registerHandle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          mt: 20,
        }}
      >
        <TextField
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: 400 }}
          label="Username"
          error={registeringClientError !== null}
          helperText={registeringClientError}
        />
        <TextField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: 400 }}
          label="Password"
          error={registeringClientError !== null}
          helperText={registeringClientError}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isRegisteringClient}
          startIcon={
            isRegisteringClient ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              ""
            )
          }
        >
          Add Account
        </Button>
      </Box>
    </form>
  );
};

export default AddNewAccount;
