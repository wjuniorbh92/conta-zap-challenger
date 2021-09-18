import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
  },
  text: {
    hyphens: "auto",
    wordWrap: "break-word",
  },
  buttom: {
    float: "right",
    alignContent: "center",
    padding: 5,
  },
}));

export default function AlertModal({ open, setOpen, message }) {
  
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title">
          {"Detalhes da Messagem"}
          <IconButton
            aria-label="close"
            className={classes.buttom}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.text}
          >
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
