import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import api from "../../services/api";
import LineChart from "../../components/LineChart/LineChart";
import BarChart from "../../components/BarChart/BarChart";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    minWidth: 30,
  },
  container: {
    maxHeight: 440,
  },
}));

export default function Home() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/triggers");

        const dataFormatted = response.data.map((item) => {
          return [item.name];
        });

        console.log(dataFormatted);
        setData(dataFormatted);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">Contas Abertas - BOT</Typography>
          <BarChart
            label={"Quantidade de Contas Abertas"}
            labels={data}
            dataGraph={Array.from({ length: data.length }, () =>
              Math.floor(Math.random() * 40)
            )}
          />
          <LineChart
            label={"Quantidade de Contas Abertas"}
            labels={Array.from(Array(24).keys())}
            dataGraph={Array.from({ length: 24 }, () =>
              Math.floor(Math.random() * 40000)
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
