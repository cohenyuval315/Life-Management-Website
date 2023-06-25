
function RenderTabSearchBar(tabs,setFilterTabs){
  function onChange(event){
    setFilterTabs(tabs.filter((tab)=>tab.name.includes(event.target.value)));
  }

  return (
    <TextField label="search" variant="outlined" onChange={(e)=>onChange(e)}/>
  );
}
