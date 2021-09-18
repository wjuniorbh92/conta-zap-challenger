import React from "react";
import api from "../../services/api";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import InputMask from "react-input-mask";

let schema = yup.object().shape({
  trigger: yup.string().required("trigger"),
  channel: yup.string().required("channel"),
  timer: yup
    .string()
    .matches(/(?:[0-9]\d|2[0123]):(?:[012345]\d)/, "timer")
    .required("timer"),
  message: yup.string().required("message"),
});

const resetError = {
  channel: false,
  trigger: false,
  timer: false,
  message: false,
};

export default function NewMessageModal({ open, setOpen, dataFetch }) {
  const [textField, setTextField] = useState([]);

  const [error, setError] = useState(resetError);

  const handleResetError = () => {
    setError(resetError);
  };

  const handleClose = () => {
    handleResetError();
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await schema.validate({
        trigger: textField.trigger,
        channel: textField.channel,
        timer: textField.timer,
        message: textField.message,
      });
      await api.post("/messages", {
        id: uuidv4(),
        channel: textField.channel,
        trigger: textField.trigger,
        timer: textField.timer,
        message: textField.message,
      });
      setOpen(false);
      setTextField([]);
      handleResetError();
      Swal.fire({
        icon: "success",
        text: "Mensagem Cadastrada com Sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      if (err.request) {
        setOpen(false);
        handleResetError();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro de conexão com o server",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const errorCatch = err.errors[0];
      setError({ [errorCatch]: true });
    }
  };

  const handleChangeInput = (input, value) => {
    setTextField({ ...textField, [input]: value });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Criar Nova Mensagem</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Gatilho"
            select
            variant="outlined"
            error={error.trigger}
            helperText="Por Favor selecione o Gatilho"
            onChange={(evt) => handleChangeInput("trigger", evt.target.value)}
          >
            {dataFetch.channel.map(({ channel }) => (
              <MenuItem key={channel} value={channel}>
                {channel}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Canal"
            select
            variant="outlined"
            error={error.channel}
            helperText={
              error.channel
                ? "Selecione um Valor!!"
                : "Por favor selecione o Canal"
            }
            onChange={(evt) => handleChangeInput("channel", evt.target.value)}
          >
            {dataFetch.trigger.map(({ trigger }) => (
              <MenuItem key={trigger} value={trigger}>
                {trigger}
              </MenuItem>
            ))}
          </TextField>
          
          <InputMask
            mask="99:99"
            // value={this.state.phone}
            disabled={false}
            onChange={(evt) => handleChangeInput("timer", evt.target.value)}
            maskChar=" "
            onError={error.timer}
            helperText={
              error.timer
                ? "Prencher no formato xx:xx"
                : "Escreve um valor para o timer"
            }
          >
            {() => (
              <TextField
                id="outlined-basic"
                label="Timer"
                variant="outlined"
                error={error.timer}
                helperText={
                  error.timer
                    ? "Prencher no formato xx:xx"
                    : "Escreve um valor para o timer"
                }
              />
            )}
          </InputMask>
          <TextField
            id="outlined-basic"
            label="Messagem"
            variant="outlined"
            type="text"
            error={error.message}
            helperText="Por favor escreva uma mensagem"
            onChange={(evt) => handleChangeInput("message", evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
