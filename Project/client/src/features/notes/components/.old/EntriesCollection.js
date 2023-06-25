import React, { useEffect, useState } from 'react';
import NestedList from './NestedList';
import Select from 'react-select/creatable';
import {TabsData,EntriesData,PropertiesData,EntryPropertiesData,TagsData,EntryTagsData} from '../data/userDataExample'


//where userid , where type == tab

// const TabsData = [
//     {
//         id:"1",
//         name:"tab1",
//         type:"list",
//         description:"tab-1",
//         tags:[{label:"tag1", value:"tag"},{label:"tag12", value:"tag12"}],
//         properties:[{label:"link", value:"pop", type:"string"},{label:"gif", value:"papi", type:"string"}]
//     },
//     {
//         id:"2",
//         name:"tab2",
//         type:"list",
//         description:"tab-2",
//         tags:[{label:"tag2", value:"tag"},{label:"tag12", value:"tag12"}],
//         properties:[{label:"l1", value:"l1", type:"string"},{label:"l2", value:"l2", type:"string"},{label:"l3", value:"l3", type:"string"},{label:"l4", value:"l4", type:"string"}]
//     },
// ];

const EntriesCollection = () => {
  return (
    <div className='container'>
    <MyList/>
    <NestedList/>
    </div>
  )
}

const MyList = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTab, setSelectedTab] = useState(null);
    // const [] = useEffect();

    useEffect(() => {
        
    }, [selectedTags])
  return (
    <div className="container">
        <div>
            {/* {selectedTags.map((tag)=> {
                tag
            })} */}
        SELECTED = {selectedTab}
        </div>
        <Select
        className="reactSelect"
        name="tabsOptions"
        placeholder="choose a tab"
        options={TabsData}
        getOptionLabel={x => x.name}
        getOptionValue={x => x.name}
        onChange={(e) => setSelectedTab(e.name)}
        // onInputChange={}
        />
    <div>
    </div>
    </div>

  )
}
export default EntriesCollection