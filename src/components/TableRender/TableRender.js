import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import Modal from "../AlertModal/AlertModal";
import NewMessageModal from "../NewMessage/NewMessageModal";
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

import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import MessageIcon from "@material-ui/icons/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 440,
  },
}));

export default function TableRender({ columns, row }) {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {columns.map((columns) => (
                <TableCell align="center">{columns}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((row) => (
              <TableRow key={uuidv4()}>
                <TableCell component="th" scope="row">
                  {row.trigger}
                </TableCell>
                <TableCell align="center">{row.channel}</TableCell>
                <TableCell align="center">{row.timer}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    aria-label="Messagem"
                    // onClick={() => {
                    //   setMessage(row.message);
                    //   setOpen(true);
                    // }}
                  >
                    <MessageIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
