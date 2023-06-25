import React from "react";
import { Tabs,Tab } from "@mui/material";
import TabPanel from "../TabPanel";
import EntryCardList from "./EntryCardList";

function EntryTabs({selectedTab, selectedEntry, tabs}) {
  
  const [selectedEntryTab, setSelectedEntryTab] = React.useState(0);

  const entryData = tabs[selectedTab].entries[selectedEntry][0];
  
  const entryTabs = ["info", "specific", "media" ,"monitor","progress","times","other"];

  // console.log(entryData);
  // console.log(tabsData);
  const handleEntryTabChange = (event, newTab) => {
    setSelectedEntryTab(newTab);
  };

  return (

    <div>
        <Tabs
          variant="scrollable"
          value={selectedEntryTab}
          scrollButtons="auto"
          onChange={handleEntryTabChange}
          aria-label="Vertical tabs example"
        >
          {entryTabs.map((tab,index)=>(<Tab key={tab} label={tab} index={index} ></Tab>))}
        </Tabs>

        <TabPanel value={selectedEntryTab} index={selectedEntryTab}>
            <EntryCardList entryData={entryData} entry_index={selectedEntryTab} entryTab={entryTabs[selectedEntryTab]} entryTabs={entryTabs} />(entryData,selectedEntryTab,entryTabs[selectedEntryTab],entryTabs)
        </TabPanel>
    </div>

  );
}
export default EntryTabs