// const allTags = [...[...new Set([].concat.apply([],tabsData.map((tab) => tab.tags)).map((tag)=>tag.label))]].map((tag)=>{return {label:tag, value:tag}});
function RenderTabSelect(tabs,setFilter,allTags) {
  
  // ,setArray,array 
  function onChange(tags){
    const selectedTags = tags.map((tag)=>tag.label);
    const filteredTabs = tabs.filter((element) => filterByTag(element,selectedTags));
    setFilter(filteredTabs);
  }

  function filterByTag(element,selectedTags){
    let res = true;
    selectedTags.map((tag)=>{
      if(!element.tags.map((tag)=>tag.label).includes(tag)){
        res = false;
      }
    })
    return res;
  }

  return (
    <div >
      <Select
            isMulti
            options={allTags}   
            // value={} 
            onChange={(e)=>onChange(e)}
            />   
    </div>
  );
}
