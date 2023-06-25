import { Tab, Tabs } from "@mui/material";
import TabPanel from "./TabPanel";
import React from "react";

function Regime({regime}){
  const properties = regime.properties;
  const infoProps = ["entries","average_mental_difficulty", "average_physical_difficulty", "benefits", "drawbacks", "complexity", "risk_level", "risks"];
  const timesProps = ["total_time", "frequency"];
  const progressProps = ["priority", "progress", "progress_fields", "progress_checkpoints"];
  const monitorProps = ["self_evaluation", "self_tips"];
  const otherProps = ["related_entries", "requirements", "alternatives"];
  

  const other = properties.filter(prop => otherProps.includes(prop.label)); 
  const specific = properties.filter(prop => ![...progressProps,...infoProps,...monitorProps,...otherProps,...timesProps].includes(prop.label));
  const times = properties.filter(prop => timesProps.includes(prop.label)); 
  const progress = properties.filter(prop => progressProps.includes(prop.label)); 
  const info = properties.filter(prop => infoProps.includes(prop.label)); 
  const monitor = properties.filter(prop => monitorProps.includes(prop.label)); 


  const [selectedTabInfo, setSelectedTabInfo] = React.useState(0);
  const regimeProps = regime.properties;

  const regimeTabs = ["info","monitor", "progress"];

  const workload = [];
  const currentRegimeTab = regimeTabs[selectedTabInfo];
  const handleChange = (event, newTab) => {
    setSelectedTabInfo(newTab);
  };

  return (
    <div>
        <Tabs
          variant="scrollable"
          value={selectedTabInfo}
          onChange={handleChange}
          aria-label="Vertical tabs"
        > 
          {regimeTabs.map((regimeTab,index)=>(<Tab key={regimeTab} label={regimeTab} index={index}/>))}
        </Tabs>

        <TabPanel value={selectedTabInfo} index={selectedTabInfo}>
            {(currentRegimeTab === "info")&&(
              <div>

              </div>
            )}
        </TabPanel>
    </div>
  );
}
export default Regime