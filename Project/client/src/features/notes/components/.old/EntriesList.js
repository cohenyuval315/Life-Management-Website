import { List, ListItem } from "@mui/material";
import EntryCard from "./EntryCard";
import React from "react";

const EntriesList = ({selectedTab, onChange, styles, tabs}) => {
  const entriesData = tabs[selectedTab].entries.map((entry) =>entry[0]);
  return (
    <List>
      {entriesData.map((entry, index)=>(
        <ListItem key={entry.name} onClick={(event)=>onChange(index)}>
            <EntryCard entry={entry} styles={styles}/>
        </ListItem>
      ))}
    </List>
  );
}
export default EntriesList