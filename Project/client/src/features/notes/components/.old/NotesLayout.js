import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import * as React from "react";
import { tabsData } from "../../../../data/delete/Data";
import EntriesList from "./EntriesList";
import TabInfo from "../TabInfo";
import EntryTabs from "./EntryTabs";
import TabPanel from "../TabPanel";
import TabsLayout from "../TabsLayout";
  // const {userData,setUserData} = useContext(UserDataContext);   which ones change together=context
const useStyles = makeStyles({
  // card: {
  //   maxWidth: 310,
  //   transition: "transform 0.15s ease-in-out",
  //   "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  // },

  NotesGridlayout: {
          mx:"auto",
          display: "grid",
          gap: 1,
          gridTemplateRows: "10% 180%",
          gridTemplateColumns: "3fr 8fr 5fr 4fr",
          pt: 5 ,
          gridTemplateAreas: `
      "tabFilter entryFilter card tabInfo"
      "tabsOptions tabEntries card  tabInfo"
      ` ,
  },
  tabFilterLayout:{
          gridArea: "tabFilter",
          flexGrow: 0,
          backgroundColor: 'white',
          border: "1px solid",
          display: "flex",
  },
  entryFilterLayout:{
            gridArea: "entryFilter",
            flexGrow: 1,
            border: "1px solid",
          backgroundColor: 'white',
            display: "flex",
  },
  tabsOptionsLayout:{
            gridArea: "tabsOptions",
            flexGrow: 1,
          backgroundColor: 'white',
            display: "flex",
  },
  tabInfoLayout:{
      gridArea: "tabInfo",
      flexGrow: 1,
          backgroundColor: 'white',
      display: "flex",
  },
  cardLayout:{
            gridArea: "card",
            flexGrow: 1,
          backgroundColor: 'white',
            display: "flex",
  },
  tabEntriesLayout:{
            gridArea: "tabEntries",
            flexGrow: 1,
          backgroundColor: 'white',
            display: "flex",

  }

});


export default function NotesLayout() {

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedEntry, setSelectedEntry] = React.useState(0);
  const [tagsFilteredTabs, setTagsFilteredTabs] = React.useState(tabsData);  
  const [searchFilteredTabs, setSearchFilteredTabs] = React.useState(tabsData);  
  const [filteredTabs, setFilteredTabs] = React.useState(tabsData);  

  const [tagsFilteredEntries, setTagsFilteredEntries] = React.useState(tabsData[selectedTab]);  
  const [searchFilteredEntries, setSearchFilteredEntries] = React.useState(tabsData[selectedTab]); 
  const [filteredEntries, setFilterEntries] = React.useState(tabsData[selectedTab]); 

  const styles = useStyles();

  React.useEffect(() => {
    setSelectedTab(0);
    setSelectedEntry(0);
    setFilteredTabs(tabsData.filter((tab)=> tabsFilter(searchFilteredTabs,tab.name) && tabsFilter(tagsFilteredTabs,tab.name)));
  }, [tagsFilteredTabs,searchFilteredTabs])

  
  const handleTabChange = (event, newTab) => {
    handleEntryChange(0);
    setSelectedTab(newTab);
  };

  const handleEntryChange = (newEntry) => {
    setSelectedEntry(newEntry);
  };

  function tabsFilter(filtredTabs,name){
    let res = false;
    filtredTabs.map((tab) => {
      if(tab.name === name){
        res=true;
    }})
    return res;
  }  
  const classes = useStyles();


  return (
    <>

      <Box className={classes.NotesGridlayout}>
        <Box className={classes.tabFilterLayout}> 
        </Box>  

        <Box className={classes.entryFilterLayout}  >
        </Box>

        <Box className={classes.tabsOptionsLayout}>
          <TabsLayout filteredTabs={filteredTabs} handleTabChange={handleTabChange} selectedTab={selectedTab}/>
        </Box>
        <Box className={classes.tabEntriesLayout}>
          <TabPanel value={selectedTab} index={selectedTab}>
            {(filteredTabs.length > 0)? <EntriesList selectedTab={selectedTab} onChange={handleEntryChange} styles={styles} tabs={filteredTabs}/>  :(<div></div>)}
          </TabPanel>
        </Box>
        <Box className={classes.cardLayout}>
          {(filteredTabs.length > 0)? <EntryTabs selectedTab={selectedTab} selectedEntry={selectedEntry} tabs={filteredTabs}/>:(<div></div>)}
        </Box>
        <Box className={classes.tabInfoLayout}>
          {(filteredTabs.length > 0)? <TabInfo selectedTab={selectedTab} tabs={filteredTabs}/>:(<div></div>)}
        </Box>

      </Box>

    </>
  );
}
