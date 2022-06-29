import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, MenuItem, Modal, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Grid from '@mui/material/Grid';
import frLocale from 'date-fns/locale/fr';
import { IUser } from '../../interfaces';
import UsersService from '../../services/users.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthContext } from '../../contexts/UserContext/authContext';
import MaskField from '../MaskField';

interface Props {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

export default function CreateUserModal({ setUsers }: Props): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const [User, setUser] = useState({
    name: '',
    password: '',
    birthdate: '',
    admin: false,
    observation: '',
  });
  const [cpf, setCpf] = useState<string>('');
  const { token } = React.useContext(AuthContext);

  const adm = localStorage.getItem('userPermission');

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await UsersService.allUsers();
      setUsers(data);
      handleClose();
    } catch (error) {
      toastMsg(ToastType.Error, error.response.data.message);
    }
  };

  const CreateUser = async (
    event: React.FormEvent,
    { name, password, birthdate, admin, observation }: IUser
  ): Promise<void> => {
    event.preventDefault();
    try {
      await UsersService.create(token, name, cpf, password, birthdate, admin, observation);

      toastMsg(ToastType.Success, ' Cadastrado com sucesso! ');
      fetchUsers();
    } catch (error) {
      toastMsg(ToastType.Error, error.response.data.message);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<EditIcon />} disabled={adm === 'Colaborador'}>
        Criar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={(event) => CreateUser(event, User)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,

            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Criar Usuário
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Nome
            </Typography>
            <TextField
              name="name"
              fullWidth
              id="name"
              value={User.name}
              onChange={(event) => setUser({ ...User, name: event.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              CPF
            </Typography>

            <MaskField user={cpf} setCpf={setCpf} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Senha
            </Typography>
            <TextField
              name="password"
              type="password"
              fullWidth
              id="password"
              value={User.password}
              onChange={(event) => setUser({ ...User, password: event.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Data de nascimento
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
              <DatePicker
                value={User.birthdate}
                onChange={(event) => {
                  setUser({ ...User, birthdate: event });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Permissão
            </Typography>
            <Select
              fullWidth
              id="Permission"
              value={User.admin ? 1 : 0}
              label="Permissão"
              onChange={(event) => setUser({ ...User, admin: !!event.target.value })}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={0}>Colaborador</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Observação
            </Typography>
            <TextField
              name="observation"
              fullWidth
              id="observation"
              value={User.observation}
              onChange={(event) => setUser({ ...User, observation: event.target.value })}
            />
          </Grid>
          <Button type="submit" variant="outlined" size="medium">
            Criar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
