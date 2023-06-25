
const Types = [
{name:"plan"},
{name:"roadmap"},
{name:"mindmap"},
{name:"check nodepad"},
{name:"ready scripts or like commands - like regex find ... inside script wiki?"}

];
const TabsData = [
    {
        id:"1",
        name:"tab1",
        type:"list",
        description:"tab-1",
        tags:[{label:"tag1", value:"tag"},{label:"tag12", value:"tag12"}],
        properties:[{label:"link", value:"pop", type:"string"},{label:"gif", value:"papi", type:"string"}]
    },
    {
        id:"2",
        name:"tab2",
        type:"list",
        description:"tab-2",
        tags:[{label:"tag2", value:"tag"},{label:"tag12", value:"tag12"}],
        properties:[{label:"l1", value:"l1", type:"string"},{label:"l2", value:"l2", type:"string"},{label:"l3", value:"l3", type:"string"},{label:"l4", value:"l4", type:"string"}]
    },
    {
        id:"3",
        name:"tab3",
        type:"list",
        description:"tab-3",
        tags:[{label:"tag3", value:"tag3"},{label:"tag4", value:"tag4"}],
        properties:[{label:"l1", value:"l1", type:"int"},{label:"l2", value:"l2", type:"string"}]
    },
    {
        id:"4",
        name:"shouldnt",
        type:"plan",
        description:"",
        tags:[{label:"tag", value:"tag"},{label:"tag2", value:"tag2"}],
        properties:[{label:"pop", value:"pop", type:"string"},{label:"papi", value:"papi", type:"string"}]
    },
    {
        id:"5",
        name:"listroutine",
        type:"list-routine",
        description:"",
        tags:[{label:"tag", value:"tag"},{label:"tag2", value:"tag2"}],
        properties:[{label:"pop", value:"pop", type:"string"},{label:"papi", value:"papi", type:"string"}]
    },
    {
        id:"6",
        name:"listplan",
        type:"list-plan",
        description:"",
        tags:[{label:"tag", value:"tag"},{label:"tag2", value:"tag2"}],
        properties:[{label:"pop", value:"pop", type:"string"},{label:"papi", value:"papi", type:"string"}]
    },

];

const EntriesData = [
    {
        id: "1",
        user_id : "1",
        name : "entry1",
        type: "listing",
        description: "entry1 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "2",
        user_id : "1",
        name : "entry2",
        type: "listing",
        description: "entry2 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "3",
        user_id : "1",
        name : "entry3",
        type: "listing",
        description: "entry3 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "4",
        user_id : "1",
        name : "entry4",
        type: "listing",
        description: "entry4 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "5",
        user_id : "1",
        name : "entry5",
        type: "listing",
        description: "entry5 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "6",
        user_id : "1",
        name : "entry6",
        type: "listing",
        description: "entry6 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "7",
        user_id : "1",
        name : "entry7",
        type: "listing",
        description: "entry7 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "8",
        user_id : "1",
        name : "entry8",
        type: "listing",
        description: "entry8 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "9",
        user_id : "1",
        name : "entry9",
        type: "listing",
        description: "entry9 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "10",
        user_id : "1",
        name : "entry10",
        type: "listing",
        description: "entry10 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "11",
        user_id : "1",
        name : "entry11",
        type: "listing",
        description: "entry11 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "12",
        user_id : "1",
        name : "entry12",
        type: "listing",
        description: "entry12 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "13",
        user_id : "1",
        name : "entry13",
        type: "listing",
        description: "entry13 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
    {
        id: "14",
        user_id : "1",
        name : "entry14",
        type: "listing",
        description: "entry14 description",
        state_type: "UnderConstruction",
        state: "ca",
    },
];
const EntryTagsData = [
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
    {
        group_id : "1",
        group_name : "entry1",
        entry_id: "1",
        entry_user_id : "1",
        tag_id : "1",
    },
]
const EntryPropertiesData = [
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
    {
        entry_id: "1",
        entry_user_id : "1",
        property_id : "1",
        property_value : "1",
    },
];

const data_types = [
{"s":"string", "special":[]},
{"i":"int", "special":["priority","time", "progress"]},
{"f":"float", "special":[""]},
{"b":"bool", "special":["secret"]},
{"t":"time", "special":["freqency"]},
{"j":"json", "special":["monitor"]},// not changing or changing the whole json everytime
{"t":"tuple", "special":[""]},
{"s":"string"},
];
const phy_template_data_types = [
{"s":"string"},
{"i":"int", "special":["weight", "sets", "reps"]},
{"f":"float"},
{"b":"bool", "special":[""]},
{"t":"time", "special":[""]},
{"j":"json", "special":[""]},
{"t":"tuple", "special":["tempo"]},
{"s":"string"},
];
const PropertiesData= [
    {
        id: "1",
        name : "1",
        data_type : "s",
    },
    {
        id: "2",
        name : "monitor",
        data_type : "j",
    },
    {
        id: "3",
        name : "1",
        data_type : "i",
    },
    {
        id: "4",
        name : "1",
        data_type : "1",
    },
    {
        id: "5",
        name : "1",
        data_type : "1",
    },
    {
        id: "6",
        name : "1",
        data_type : "1",
    },
    {
        id: "7",
        name : "1",
        data_type : "1",
    },
    {
        id: "8",
        name : "1",
        data_type : "1",
    },
];

const TagsData= [
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
    {
        id: "1",
        name : "1",
        value : "1",
    },
];
export {TabsData,EntriesData,PropertiesData,EntryPropertiesData,TagsData,EntryTagsData};