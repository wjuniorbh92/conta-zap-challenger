import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../components/AlertModal/AlertModal";
import NewMessageModal from "../../components/NewMessage/NewMessageModal";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MessageIcon from "@material-ui/icons/Message";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";
import fetchAllData from "../../services/fetchAllData";
import fetchFilteredData from "../../services/fetchFilterData";
import DeleteIcon from "@material-ui/icons/Delete";
import deleteItem from "../../services/deleteItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    minWidth: 30,
  },
  cardContent: {
    alignContent: "center",
  },
  button: {
    margin: theme.spacing(2, 1, 1, 1),
    textAlign: "right",
  },
  newMessageButton: {
    margin: theme.spacing(1, 1, 1, 1),
    float: "right",
  },
  textInput: {
    margin: theme.spacing(1, 1, 1, 1),
  },
  iconButton :{
    alignContent:'center'
  }
}));

export default function Mensagens() {
  const classes = useStyles();

  const [dataFetch, setDataFetch] = useState({
    message: [],
    channel: [],
    trigger: [],
    timer: [],
  });
  const [textField, setTextField] = useState([]);
  const [open, setOpen] = useState(false);
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteID, setDeleteId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataFetch(await fetchAllData());
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro de conexão com o server",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };
    fetchData();
  }, [openNewMessage, deleteID]);

  const handleChangeSelected = (input, value) => {
    setTextField({ ...textField, [input]: value });
  };

  const handleDelete = async () => {
    const response = await deleteItem(deleteID);
    setDeleteId("");
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Mensagem Deletada com Sucesso",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo deu errado tente novamente",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
  };

  const handleSearch = async () => {
    const dataResponse = await fetchFilteredData(textField);
    setDataFetch({
      ...dataFetch,
      message: dataResponse.data.map((item) => {
        return {
          id: item.id,
          channel: item.channel,
          trigger: item.trigger,
          timer: item.timer,
          message: item.message,
        };
      }),
    });
    setTextField([]);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">Mensagens</Typography>

          <Button
            variant="contained"
            className={classes.newMessageButton}
            color="secondary"
            onClick={() => setOpenNewMessage(true)}
          >
            Nova Mensagem
          </Button>
        </CardContent>

        <CardContent className={classes.cardContent}>
          <Typography variant="h6" alignCenter>
            Filtrar Tabela
          </Typography>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Channel"
            select
            variant="outlined"
            helperText="selecione o gatilho"
            onChange={(evt) =>
              handleChangeSelected("channel", evt.target.value)
            }
          >
            <MenuItem key={uuidv4()} value={""}></MenuItem>
            {dataFetch.channel.map(({ channel }) => (
              <MenuItem key={uuidv4()} value={channel}>
                {channel}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Gatilho"
            select
            variant="outlined"
            helperText={"selecione o canal"}
            onChange={(evt) =>
              handleChangeSelected("trigger", evt.target.value)
            }
          >
            {" "}
            <MenuItem key={uuidv4()} value={undefined}></MenuItem>
            {dataFetch.trigger.map(({ trigger }) => (
              <MenuItem key={uuidv4()} value={trigger}>
                {trigger}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.textInput}
            select
            id="outlined-basic"
            label="Timer"
            variant="outlined"
            helperText={"selecione o  timer"}
            onChange={(evt) => handleChangeSelected("timer", evt.target.value)}
          >
            <MenuItem key={uuidv4()} value={undefined}></MenuItem>
            {dataFetch.message.map(({ timer }) => (
              <MenuItem key={uuidv4()} value={timer}>
                {timer}
              </MenuItem>
            ))}
          </TextField>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Pesquisar
          </Button>
        </CardContent>

        <CardContent>
          <Paper className={classes.root}>
            <TableContainer component={Paper} >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow head>
                    <TableCell align="center">Gatilho</TableCell>
                    <TableCell align="center">Canal</TableCell>
                    <TableCell align="center">Timer</TableCell>
                    <TableCell align="center">Açōes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFetch.message.map((row) => (
                    <TableRow footer key={uuidv4()}>
                      <TableCell component="th" scope="row">
                        {row.trigger}
                      </TableCell>
                      <TableCell align="center">{row.channel}</TableCell>
                      <TableCell align="center">{row.timer}</TableCell>
                      <TableCell className={classes.iconButton}>
                        <IconButton
                          color="primary"
                          aria-label="Messagem"
                          onClick={() => {
                            setMessage(row.message);
                            setOpen(true);
                          }}
                        >
                          <MessageIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          aria-label="delete"
                          onClick={() => {
                            setDeleteId(row.id);
                            handleDelete();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </CardContent>
      </Card>

      <Modal open={open} setOpen={setOpen} message={message} />
      <NewMessageModal
        open={openNewMessage}
        setOpen={setOpenNewMessage}
        dataFetch={dataFetch}
      />
    </div>
  );
}
