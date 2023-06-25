




const EntryTypes = [
     // containers 
  {
    type: "tab",
    stateType: {
      UNDER_CONSTRUCTION: "under_construction",
      LIST: "",
    },
    state: [""],
  },






    // listing,nodes, hierchy above tab if pyramid from down


  {
    type: "listing",
    stateType: {
      UNDER_CONSTRUCTION: "under_construction",
    },
    state: [""],
  },

  {
    type: "node",
    stateType: {
      UNDER_CONSTRUCTION: "under_construction",
    },
    state: [""],
  },
];

export default { EntryTypes };
