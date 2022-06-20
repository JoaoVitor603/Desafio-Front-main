import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import UsersService from "../../services/users.service";
import HttpClient from "../../services/httpClient";
import toastMsg, { ToastType } from "../../utils/toastMsg";
import { AuthContext } from "../../contexts/UserContext/authContext";
import { IUserResponse } from "../../interfaces/IUserResponse";

const Home: React.FunctionComponent = () => {
  const theme = createTheme();
  const [id, setCpf] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const navigate = useNavigate();
  const { handleLogin, signed } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (c: React.FormEvent<HTMLFormElement>) => {
    c.preventDefault();
    try {
      const data = await UsersService.signIn(id, password);
      // const user = {
      // //   data.user.id,
      // //   data.user.admin,
      // // };
      // // console.log(data);
      // //   handleLogin(data.token,   );

      if (data.token) {
        HttpClient.api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        navigate("/Home");
      }

      toastMsg(ToastType.Success, "Logou com sucesso! ");
    } catch (error) {
      toastMsg(
        ToastType.Error,
        (error as AxiosError).response?.statusText || "Internal Server Error!"
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="login"
                  required
                  fullWidth
                  id="Digite o CPF"
                  label="Digite o CPF"
                  autoFocus
                  value={id}
                  onChange={(c) => setCpf(c.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(c) => setPassoword(c.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item />
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;