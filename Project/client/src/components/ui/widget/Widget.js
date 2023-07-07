import React from "react";
import { makeStyles } from "@mui/styles";
import {Card} from "@mui/material";
import { Icons } from "../../../assets";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "block",
    flexDirecion: "column",
    

  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem"
  },
  spacer: {
    flexGrow: 1
  },
  body: {
    padding: "0.5rem",
    flexGrow: 1,
  }
});

const widgetNames = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E"
};

export default function Widget({ id, onRemoveItem  , component:Item}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6" gutterBottom>
          {widgetNames[id]}
        </Typography>
        <div className={classes.spacer} />
        <div aria-label="delete" onClick={() => onRemoveItem(id)}>
          {Icons.Close}
        </div>
      </div>

      <div className={classes.body}>
          <Item/>
      </div>
    </Card>
  );
}
