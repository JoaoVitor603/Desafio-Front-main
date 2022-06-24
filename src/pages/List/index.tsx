import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../interfaces";
import "./style.scss";

import formatDate from "../../utils/formatDate";
import EditUserModal from "../../Components/editUserModal";
import CreateUserModal from "../../Components/createUserModal";
import { AuthContext } from "../../contexts/UserContext/authContext";
import DeleteUserModal from "../../Components/deleteUserModal";

const List: React.FunctionComponent = () => {
  const { handleSignOut } = React.useContext(AuthContext);
  const [allUser, setAllUser] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/users/`)
      .then((resposta) => setAllUser(resposta.data));
  }, []);

  return (
    <Box className="screen" component="span">
      <Typography variant="h1" sx={{ fontSize: 40 }} gutterBottom>
        Lista de Funcionários
      </Typography>
      <Button
        color="error"
        variant="outlined"
        size="medium"
        onClick={handleSignOut}
      >
        {" "}
        Sair
      </Button>
      <CreateUserModal setUsers={setAllUser} />
      {allUser.map((u: IUser) => (
        <Card className="user_card card_usuario" sx={{ minWidth: 400 }}>
          <CardContent>
            <Typography sx={{ fontSize: 23 }} color="text.primary" gutterBottom>
              {u.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {u.admin ? "Administrador" : "Coloborador"}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              {u.observation}
            </Typography>
            <Typography variant="inherit">{formatDate(u.birthdate)}</Typography>
            <Typography variant="inherit"> {u.cpf}</Typography>
          </CardContent>
          <CardActions>
            <EditUserModal user={u} setUsers={setAllUser} />
            <DeleteUserModal user={u.id} setUsers={setAllUser} />
            {/* <Button
              variant="outlined"
              size="medium"
              startIcon={<DeleteIcon />}
              onClick={() => deleteUser(u.id)}
            > */}

            {/* </Button> */}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
export default List;
