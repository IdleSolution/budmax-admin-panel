import React, { FormEvent, useState, useEffect } from "react";

import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SuccessfulLogin } from "../../types/auth";

import Fetcher from "../../utils/Fetcher";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [requestedLogin, setRequestedLogin] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const hasJWT = () => localStorage.getItem("token");
    if (hasJWT()) {
      navigate("/coals")
    }
  }, [])

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequestedLogin(true);
    const fetcher = new Fetcher();
    try {
      const response = await fetcher.postData<SuccessfulLogin>("/admin-auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.token);

      setRequestedLogin(false);
      navigate("/coals");
    } catch (e) {
      setRequestedLogin(false);
      setIsError(true);
    }
  };

  return (
    <Container>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        onSubmit={loginHandler}
      >
        <Box mb={2}>
          <Typography variant="h5">Clashdle admin panel</Typography>
        </Box>
        <Box width={"30%"} m={1}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Login"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={isError}
          />
        </Box>
        <Box width={"30%"} m={1}>
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={isError}
          />
        </Box>
        <Box width={"30%"} m={1}>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          {requestedLogin && <LinearProgress color="success" />}
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
