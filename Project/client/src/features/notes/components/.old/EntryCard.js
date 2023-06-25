import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

function EntryCard({entry,styles}){
  return (
      <Card className={styles.card}>
        <CardHeader title={entry.name} subheader={entry.state}>
        </CardHeader>
        <CardContent>
          <Typography>
              placeholder
          </Typography>
        </CardContent>
      </Card>
  );
}

export default EntryCard