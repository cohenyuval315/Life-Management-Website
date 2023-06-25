import React from 'react'
import { Tab,Tabs } from '@mui/material';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TabsLayout = ({selectedTab,handleTabChange,filteredTabs}) => {
  return (
          <Tabs

            orientation="vertical"
            variant="scrollable"
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {
            filteredTabs.map((tab, index) => {              
              return(
              <Tab
                key={`${tab.name}_tab`}
                label={tab.name}
                {...a11yProps(index)}
                index={index}
              />);
              
            
            })}

          </Tabs>
  )
}

export default TabsLayout