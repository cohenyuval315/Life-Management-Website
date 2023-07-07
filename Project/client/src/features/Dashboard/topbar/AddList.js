import React from "react";
import { makeStyles } from "@mui/styles";
import {Popover} from "@mui/material";
import {FormControlLabel,FormGroup,FormControl,FormLabel} from "@mui/material";

import { Checkbox } from "@mui/material";
import { Icons } from "../../../assets";

const useStyles = makeStyles((theme) => ({
  popup: {
    // padding: theme.spacing(2)
  }
}));

const widgetNames = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E"
};

export default function AddList({
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    if (e.target.checked) {
      onAddItem(e.target.name);
    } else {
      onRemoveItem(e.target.name);
    }
  };

  return (
    <>
      <div aria-label="add" onClick={handleClick} aria-describedby={id}>
        {Icons.faCircle}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div className={classes.popup}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Widgets</FormLabel>
            <FormGroup>
              {originalItems.map((i) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={items.includes(i)}
                      onChange={handleChange}
                      name={i}
                    />
                  }
                  label={widgetNames[i]}
                  key={i}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </Popover>
    </>
  );
}
