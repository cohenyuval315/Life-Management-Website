import { Tab, Tabs } from '@material-ui/core'
import React,{useEffect,useState} from 'react'


const StyledTabs = ({tabsOptions,handleChange}) => {
    const [selectedTab,setSelectedTab] = useState(0)

    function handleTabChange(event,newTab){
      setSelectedTab(newTab)

    }

    useEffect(() => {
      handleChange(selectedTab)
    }, [selectedTab,setSelectedTab])
    
  return (
    <div>
        <Tabs
        variant="scrollable"
        value={selectedTab}
        sx={{
            "& button": { borderRadius: 2 },
            "& button:hover": { backgroundColor: "gray" },
            "& button:focus": { backgroundColor: "black" },
            "& button:active": { backgroundColor: "white" }
        }}
        TabIndicatorProps={{
            style: {
            backgroundColor: "#5B4A42",
            
            },
        }}

        scrollButtons="auto"
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
        >
        {tabsOptions.map((tab,index)=>(
            <Tab style={{color:"red"}} key={tab} label={tab} index={index}></Tab>
        ))}
        </Tabs>
    </div>
  )
}

export default StyledTabs