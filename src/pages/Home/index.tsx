import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
import MaskField from "../../Components/MaskField";

const Home: React.FunctionComponent = () => {
  const theme = createTheme();
  const [id, setCpf] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (
    c: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    c.preventDefault();
    try {
      const data = await UsersService.signIn(id, password);
      const userRes = {
        id: data.user.id,
        permission: data.user.permission,
      };

      handleLogin(data.token, userRes);

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
                <MaskField user={id} setCpf={setCpf} />
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
