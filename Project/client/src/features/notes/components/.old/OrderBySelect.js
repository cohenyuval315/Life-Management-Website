function RenderEntriesOrder(tabs,setFilterEntries) {
  const orderBy = [{label:"priority", value:"priority"}];
  
  function onChange(event){
    const newOrderTabs = tabs.sort((a, b) => {

        const orderByProp= event.label;
        const aProp = a.properties.filter((prop)=>prop.label === orderByProp); 
        console.log(aProp);
        console.log(a.properties.filter((prop)=>prop.label === orderByProp)[0]);
        const bProp = b.properties.filter((prop)=>prop.label === orderByProp); 
        if (aProp < bProp) {
          return -1;
        }
        if (aProp > bProp) {
          return 1;
        }

        // names must be equal
        return 0;
        })
    console.log(newOrderTabs);
  }
  return (
    <Select 
      placeholder={"order by"}
      defaultValue={""}
      options={orderBy}
      onChange={(e)=>onChange(e)}
      
    />

  );
}
