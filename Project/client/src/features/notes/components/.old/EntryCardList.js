import { Card, CardContent, CardHeader, CardMedia, Chip, IconButton, Tab, Tabs } from "@mui/material";
import React from "react";
import TabPanel from "../TabPanel";
import  NestedList from '../../../../components/unused/NestedList/NestedList'

function EntryCardList({entryData, entry_index, entryTab,entryTabs}){

  const properties = entryData.properties;
  const name = entryData.name;
  const tags = entryData.tags.sort((a,b)=>a.label.localeCompare(b.label)).map((a)=>a.label);

  const state = entryData.state; // under construction, in progress, on hold,
  const state_type = entryData.state_type; // structure type- 
  const type = entryData.type; // item , regime, pool, 

  const infoProps = ["usecase","mental_difficulty", "physical_difficulty", "benefits", "drawbacks", "complexity", "risk_level", "risks"];
  const mediaProps = ["videos", "pictures", "links", "gifs"];
  const timesProps = ["total_time", "time_len", "break_time", "frequency"];
  const progressProps = ["priority", "progress", "progress_fields", "progress_checkpoints"];
  const monitorProps = ["self_evaluation", "self_tips"];
  const otherProps = ["related_entries", "requirements", "alternatives"];
  
  const media = properties.filter(prop => mediaProps.includes(prop.label)); 
  const other = properties.filter(prop => otherProps.includes(prop.label)); 
  const specific = properties.filter(prop => ![...progressProps,...infoProps,...monitorProps,...otherProps,...mediaProps,...timesProps].includes(prop.label));
  const times = properties.filter(prop => timesProps.includes(prop.label)); 
  const progress = properties.filter(prop => progressProps.includes(prop.label)); 
  const info = properties.filter(prop => infoProps.includes(prop.label)); 
  const monitor = properties.filter(prop => monitorProps.includes(prop.label)); 

  const [selectedEntryMediaTab, setSelectedEntryMediaTab] = React.useState(0);

  const handleOnClick = () => {
    
  }
  const handleEntryMediaTabChange = (event, newMedia) => {
    setSelectedEntryMediaTab(newMedia);
  }
  const entryPropsCollapse = [];

return (
    <div>

      <div>
          <div>
            state : {state} 
          </div>
          <div>
            state_type: {state_type}  
          </div>
          <div mx={3}>
            | type: {type}
          </div>
          <div mx={3}>
              | tags: 
            <div style={{ display: "inline-block"}}>
              {tags.map((tag)=>(
                  <Chip key={tag} label={tag} onClick={handleOnClick} />
                  
              ))}
            </div> 
          </div>  
      </div>

      <div>
        <Card>
          <CardHeader
            title={name}
            subheader={""}
          />

          <CardContent> 
            {(entryTab === "info") && (
              <NestedList Options={info}/>
            )}

            {(entryTab === "progress") && (
               <NestedList Options={progress}/>
            )}

            {(entryTab === "times") && (
                <NestedList Options={times}/>
            )}

            {(entryTab === "other") && (
                <NestedList Options={other}/>
            )}

            {(entryTab === "media") && (media.length > 0) &&(
                <div>
                  <div>
                      <Tabs
                        variant="scrollable"
                        value={selectedEntryMediaTab}
                        scrollButtons="auto"
                        onChange={handleEntryMediaTabChange}
                        aria-label="Vertical tabs example"
                      >
                        {media.map((item,index)=>(<Tab key={item.label} label={item.label} index={index} ></Tab>))}
                      </Tabs>

                      <TabPanel value={selectedEntryMediaTab} index={selectedEntryMediaTab}>
                          {(media[selectedEntryMediaTab].label === "pictures") &&(
                              <div>
                                  {(media[selectedEntryMediaTab].property_value !== null) && (Object.keys(media[selectedEntryMediaTab].property_value).length > 0) &&(
                                  <div>
                                    {Object.entries(media[selectedEntryMediaTab].property_value).map((item) => (
                                      <div key={item[1].name || ""}>
                                          <CardMedia 
                                              component="img"
                                              alt={item[1].name || ""}
                                              image={`${process.env.PUBLIC_URL}/assets/images/${item[1].path}` || ""}
                                              height={item[1].height || 200}
                                              width={item[1].width || 200}
                                          />
                                      </div>
                                    ))}
                                </div>
                                  )}
                              </div>
                          )}

                          {(media[selectedEntryMediaTab].label === "videos") &&(

                              <div>
                                  {(media[selectedEntryMediaTab].label === "videos")&& (media[selectedEntryMediaTab].property_value !== null) &&(Object.keys(media[selectedEntryMediaTab].property_value).length > 0)  &&(
                                  <div>
                                    {Object.entries(media[selectedEntryMediaTab].property_value).map((item) => (
                                        <div key={item[1].name}>
                                        {(item[1].path.includes("youtube")?(
                                          <CardMedia 
                                              component="iframe"
                                              alt={item[1].name || ""}
                                              image={"https://www.youtube.com/embed/bEv6CCg2BC8?start=180"}
                                              height={item[1].height || 200}
                                              width={item[1].width || 200}
                                              allowFullScreen
                                          />

                                        ):(
                                          <CardMedia 
                                              component="video"
                                              alt={item[1].name || ""}
                                              image={`${process.env.PUBLIC_URL}/assets/videos/${item[1].path}` || ""}
                                              height={item[1].height || 200}
                                              width={item[1].width || 200}
                                              controls
                                          />
                                        ))}

                                        </div>
                                    ))}
                                  </div>
                                  )}
                              </div>
                          )} 
                          {(media[selectedEntryMediaTab].label === "links") &&(

                              <div>
                                {(media[selectedEntryMediaTab].label === "links")&& (media[selectedEntryMediaTab].property_value !== null) && (Object.keys(media[selectedEntryMediaTab].property_value).length > 0)  &&(
                                <div>
                                  {Object.entries(media[selectedEntryMediaTab].property_value).map((item) => (
                                      <div key={item[1].name} style={{border: "1px ridge"}}>
                                          <div>
                                                <div>name: {item[1].name || ""}:</div>  
                                                <div>description :{item[1].description || "desc"}</div>
                                                <div>link: {item[1].path || ""}</div>
                                          </div>

                                      </div>
                                      
                                  ))}
                                </div>
                                )}
                              </div>
                          )} 
                          {(media[selectedEntryMediaTab].label === "gifs") &&(

                              <div>
                                  {(media[selectedEntryMediaTab].label === "gifs")&& (media[selectedEntryMediaTab].property_value !== null) && (Object.keys(media[selectedEntryMediaTab].property_value).length > 0)  &&(
                                  <div>
                                    {Object.entries(media[selectedEntryMediaTab].property_value).map((item) => (
                                        <div key={item[1].name}>
                                          <CardMedia 
                                              component="img"
                                              alt={item[1].name || ""}
                                              src={`${process.env.PUBLIC_URL}/assets/gifs/${item[1].path}` || ""}
                                              height={item[1].height || 200}
                                              width={item[1].width || 200}
                                              controls
                                          />
                                        </div>
                                    ))}
                                  </div>
                                  )}
                              </div>
                          )} 
                          {(media[selectedEntryMediaTab].label === "audio") &&(

                              <div>
                                  {(media[selectedEntryMediaTab].label === "gifs")&& (media[selectedEntryMediaTab].property_value !== null) && (Object.keys(media[selectedEntryMediaTab].property_value).length > 0)  &&(
                                  <div>
                                    {Object.entries(media[selectedEntryMediaTab].property_value).map((item) => (
                                        <div key={item[1].name}>
                                        </div>
                                    ))}
                                  </div>
                                  )}
                              </div>
                          )} 
                      </TabPanel>
                  </div>
                </div>
            )}

            {(entryTab === "specific") && (
                <NestedList Options={specific}/>
            )}

            {(entryTab === "monitor") && (
                <NestedList Options={monitor}/>
            )}

          </CardContent>
        </Card>        
      </div>
    </div>
  );
}
export default EntryCardList