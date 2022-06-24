import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import { IUser } from "../../interfaces";
import UsersService from "../../services/users.service";
import toastMsg, { ToastType } from "../../utils/toastMsg";
import { AuthContext } from "../../contexts/UserContext/authContext";

interface Props {
  user: string;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

export default function DeleteUserModal({
  user,
  setUsers,
}: Props): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const { token } = React.useContext(AuthContext);
  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await UsersService.allUsers();
      setUsers(data);
      handleClose();
    } catch (error) {
      toastMsg(
        ToastType.Error,
        (error as AxiosError).response?.data || "Internal Server Error!"
      );
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await UsersService.delete(id, token);

      toastMsg(ToastType.Success, "Deletado com sucesso!");

      fetchUsers();
    } catch (error) {
      toastMsg(
        ToastType.Error,
        (error as AxiosError).response?.statusText || "Internal Server Error!"
      );
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        color="error"
        startIcon={<EditIcon />}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja deletar o usuário ?
          </Typography>
          <Button
            color="error"
            type="submit"
            variant="outlined"
            size="medium"
            onClick={() => deleteUser(user)}
          >
            Deletar Usuario
          </Button>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
