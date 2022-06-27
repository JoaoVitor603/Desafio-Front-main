import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, MenuItem, Modal, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { IUser } from '../../interfaces';
import UsersService from '../../services/users.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthContext } from '../../contexts/UserContext/authContext';

interface Props {
  user: IUser;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

interface IupdatedUser {
  observation?: string;
  admin?: boolean;
}

export default function EditUserModal({ user, setUsers }: Props): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const [attUser, setAttUser] = useState({
    name: user.name,
    cpf: user.cpf,
    observation: user.observation,
    admin: user.admin,
  });
  const { token } = React.useContext(AuthContext);
  const adm = localStorage.getItem('userPermission');
  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await UsersService.allUsers();
      setUsers(data);
      handleClose();
    } catch (error) {
      toastMsg(ToastType.Error, error.response?.data || 'Internal Server Error!');
    }
  };

  const updateUser = async (event: React.FormEvent, { admin, observation }: IupdatedUser): Promise<void> => {
    event.preventDefault();
    try {
      await UsersService.update(token, user.id, observation, admin);

      toastMsg(ToastType.Success, 'Atualizado com sucesso! ');
      fetchUsers();
    } catch (error) {
      toastMsg(ToastType.Error, error.response?.statusText || 'Internal Server Error!');
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<EditIcon />} disabled={adm === 'Colaborador'}>
        Editar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={(event) => updateUser(event, attUser)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Atualizar Usuário
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 16 }}>
            Nome
          </Typography>
          <TextField name="name" fullWidth id="name" value={attUser.name} disabled />
          <Typography variant="body2" sx={{ fontSize: 16 }}>
            CPF
          </Typography>
          <TextField name="cpf" fullWidth id="cpf" value={attUser.cpf} disabled />
          <Typography variant="body2" sx={{ fontSize: 16 }}>
            Observação
          </Typography>
          <TextField
            name="observation"
            fullWidth
            id="observation"
            value={attUser.observation}
            onChange={(event) => setAttUser({ ...attUser, observation: event.target.value })}
          />
          <Typography variant="body2" sx={{ fontSize: 16 }}>
            Permissão
          </Typography>
          <Select
            fullWidth
            id="Permission"
            value={attUser.admin ? 1 : 0}
            label="Permissão"
            onChange={(event) => setAttUser({ ...attUser, admin: !!event.target.value })}
          >
            <MenuItem value={1}>Administrador</MenuItem>
            <MenuItem value={0}>Coloborador</MenuItem>
          </Select>

          <Button type="submit" variant="outlined" size="medium">
            Atualizar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
