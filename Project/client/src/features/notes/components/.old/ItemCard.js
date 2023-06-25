import React from 'react'
import { Card, CardContent, CardHeader, CardMedia, Chip, Collapse, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, TextField } from "@material-ui/core";
import { Typography } from '@mui/material';
const ItemCard = ({selectedTab,tabs , children}) => {

  const entry = tabs[selectedTab];
  const handleOnClick = () => {
  }

  return (
    <div>
      <Card>
        <CardHeader 
            title={entry.name}
          />
        <div mx={3}>
            | tags: 
          <div style={{ display: "inline-block"}}>
            {entry.tags.map((tag)=>(
                <Chip key={`${tag.label}_tag`} label={tag.label} onClick={handleOnClick} />
            ))}
          </div> 
        </div>  
        <div>
          <Typography variant="caption">
              <div>
                state : {entry.state} 
              </div>
              <div>
                state_type: {entry.state_type}  
              </div>
              <div mx={3}>
                type: <b>{entry.type}</b>
              </div>
          </Typography>
        </div>
        <div>
        {(entry.type === "regime") && ({children})}
        </div>
      </Card>
    </div>
  );
}

export default ItemCard