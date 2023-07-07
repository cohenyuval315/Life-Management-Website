import React from "react";
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Icons } from "../../../assets";
import AddList from "./AddList";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  }
}));
export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <AddList
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      />
      <div onClick={onLayoutSave}>
        {Icons.Save}
      </div>
    </Card>
  );
}
