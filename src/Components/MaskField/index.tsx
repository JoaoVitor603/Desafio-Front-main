import React, { Dispatch, SetStateAction } from "react";
import InputMask from "react-input-mask";
import { TextField } from "@material-ui/core";
import Grid from "@mui/material/Grid";

interface Props {
  user: string;
  setCpf?: Dispatch<SetStateAction<string>>;
}

export default function MaskField({ user, setCpf }: Props): React.ReactElement {
  return (
    <Grid item xs={12}>
      <InputMask
        mask="999.999.999.99"
        value={user}
        onChange={(c) => setCpf(c.target.value)}
      >
        <TextField label="Digite o CPF" fullWidth id="Digite o CPF" autoFocus />
      </InputMask>
    </Grid>
  );
}
