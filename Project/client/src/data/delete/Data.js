

const entryEdges = [
  {
    entry_child_ID:8,
    entry_parent_ID:1,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:9,
    entry_parent_ID:1,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:10,
    entry_parent_ID:1,
    weight:"",
    connection_type:"regime_item",
  },

  {
    entry_child_ID:11,
    entry_parent_ID:2,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:12,
    entry_parent_ID:2,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:13,
    entry_parent_ID:2,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:14,
    entry_parent_ID:2,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:15,
    entry_parent_ID:3,
    weight:"",
    connection_type:"regime_item",
  },
  {
    entry_child_ID:16,
    entry_parent_ID:3,
    weight:"",
    connection_type:"regime_item",
  },


  {
    entry_child_ID:11,
    entry_parent_ID:4,
    weight:"",
    connection_type:"pool_item",
  },
  {
    entry_child_ID:12,
    entry_parent_ID:4,
    weight:"",
    connection_type:"pool_item",
  },
  {
    entry_child_ID:13,
    entry_parent_ID:4,
    weight:"",
    connection_type:"pool_item",
  },
  {
    entry_child_ID:14,
    entry_parent_ID:4,
    weight:"",
    connection_type:"pool_item",
  },

  {
    entry_child_ID:8,
    entry_parent_ID:5,
    weight:"",
    connection_type:"pool_item",
  },
  {
    entry_child_ID:9,
    entry_parent_ID:5,
    weight:"",
    connection_type:"pool_item",
  },
  {
    entry_child_ID:10,
    entry_parent_ID:6,
    weight:"",
    connection_type:"pool_item",
  },

  {
    entry_child_ID:15,
    entry_parent_ID:6,
    weight:"",
    connection_type:"pool_item",
  },
  {
    entry_child_ID:16,
    entry_parent_ID:6,
    weight:"",
    connection_type:"pool_item",
  },
];

const streches = [
    {
        id:8,
        name:"open mouth jaw strech",
        type:"item",
        description:"jaw strech",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"strech", value:"strech"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
          {label:"jaw", value:"jaw"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"jaw streching"},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"mouth position", 2:"slow lowering"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:{medicaljaw:4}},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:{masseter_muscle:5}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"need more consistency"}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:2},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:2},
          {label:"complexity", value:"complexity", data_type:"int", property_value:2},
          {label:"time_len", value:"time_len", data_type:"int", property_value:60},
          {label:"total_time", value:"total_time", data_type:"int", property_value:120},
          {label:"priority", value:"priority", data_type:"int", property_value:3},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"progress"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{progress:2},checkpoint2:{progress:3}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"mouth uneven"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great exercise"},3:{stars:5,comment:"great great exercises"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
    {
        id:9,
        name:"upper trap strech",
        type:"item",
        description:"upper trap strech",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"strech", value:"strech"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
          {label:"upper trap", value:"upper trap"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"upper trap streching"},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"posture must be good", 2:"slow"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:{upper_trap:4}},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:{upper_traps:5}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"need more consistency",2:"stronger strech"}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:2},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:2},
          {label:"complexity", value:"complexity", data_type:"int", property_value:2},
          {label:"time_len", value:"time_len", data_type:"int", property_value:60},
          {label:"total_time", value:"total_time", data_type:"int", property_value:120},
          {label:"priority", value:"priority", data_type:"int", property_value:3},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"progress"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{progress:2},checkpoint2:{progress:3}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"different muscle streched"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great exercise"},3:{stars:5,comment:"great great exercises"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
    {
        id:10,
        name:"straight leg hamstring strech",
        type:"item",
        description:"hamstring straight leg strech",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"strech", value:"strech"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
          {label:"hamstring", value:"hamstring"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"hamstring streching"},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"leg position tip of leg uppward", 2:"resist pain"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:{side_hamstring:4}},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:{hamstring:5}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"need more consistency"}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:2},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:2},
          {label:"complexity", value:"complexity", data_type:"int", property_value:2},
          {label:"time_len", value:"time_len", data_type:"int", property_value:60},
          {label:"total_time", value:"total_time", data_type:"int", property_value:120},
          {label:"priority", value:"priority", data_type:"int", property_value:3},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"progress"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{progress:2},checkpoint2:{progress:3}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"tear"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great exercise"},3:{stars:5,comment:"great great exercises"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
];

const exercises = [
    {
        id:11, 
        name:"wide back squat",
        type:"item",
        description:"exercise - wideback squat",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
            {label:"exercise", value:"tag1"},
            {label:"leg", value:"tag2"},
            {label:"quad", value:"tag3"},
            {label:"hamstring", value:"tag4"},
            {label:"glute", value:"tag5"},
            {label:"abs", value:"tag6"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"more specific explaination"},
          {label:"tempo", value:"tempo", data_type:"int" , property_value:1111},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"knees not inward",2:"knee carful pressure",3:"barbell travling straight down from side view"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}}, // pain 
          {label:"working_bodyparts_medical_names", value:"working_bodyparts_medical_names", data_type:"json", property_value:{semitendinosus:5,semimembranosus:5,biceps_femoris_longus:5,piriformis:5,gluteus_minimus:6,gluteus_medius:6,gluteus_maximus:6,vastus_lateralis:10,vastus_medialis:10,rectus_femoris:10,}}, // wide back squat - primary and secendaries
          {label:"working_bodyparts_names", value:"working_bodyparts_names", data_type:"json", property_value:{hamstring:5,glutes:5,lateral_quads:3,medial_quad:5, lower_abs:5,abductors:3,adductors :5, abs_holder:5}}, // wide back squat - primary and secendaries
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{successes:{1:{description:"good stability on legs"},2:{description:"good straight back"}},fails:{1:{description:"weak mediators",overcome:false},2:{description:"weak hamstrings", overcome:false}}}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:7},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:7},
          {label:"complexity", value:"complexity", data_type:"int", property_value:8},
          {label:"weight", value:"weight", data_type:"int", property_value:100},
          {label:"sets", value:"sets", data_type:"int", property_value:3},
          {label:"reps", value:"reps", data_type:"int", property_value:10},
          {label:"time_of_set", value:"time_of_set", data_type:"int", property_value:40},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"total_time", value:"total_time", data_type:"int", property_value:400},
          {label:"priority", value:"priority", data_type:"int", property_value:5}, // priority if must
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"weight",2:"sets",3:"reps",4:"time_of_set",5:"break_time"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{weight:120,sets:3,reps:10,time_of_set:40,break_time:90},checkpoint2:{weight:130,sets:3,reps:10,time_of_set:40,break_time:90}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"knees",2:"lowerback",3:"uneven legs"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"great"},2:{stars:5,comment:"great exercise"},3:{stars:5,comment:"great great exercises"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },

    {
        id:12, 
        name:"hammer curls",
        type:"item",
        description:"exercise - hammer curls",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
            {label:"exercise", value:"tag1"},
            {label:"arms", value:"tag2"},
            {label:"biceps", value:"tag3"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"more specific explaination"},
          {label:"tempo", value:"tempo", data_type:"int" , property_value:1111},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"bicep1_tip",2:"bicep2_tip",3:"bicep3_tip"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}}, // pain 
          {label:"working_bodyparts_medical_names", value:"working_bodyparts_medical_names", data_type:"json", property_value:{shorthead:7, longhead:5}}, // wide back squat - primary and secendaries
          {label:"working_bodyparts_names", value:"working_bodyparts_names", data_type:"json", property_value:{biceps:8}}, // wide back squat - primary and secendaries
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{successes:{1:{description:"good sqiz"},2:{description:"good straight back"}},fails:{1:{description:"upper traps overpower",overcome:false},2:{description:"stability at lowest point", overcome:false}}}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:3},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:3},
          {label:"complexity", value:"complexity", data_type:"int", property_value:4},
          {label:"weight", value:"weight", data_type:"int", property_value:80},
          {label:"sets", value:"sets", data_type:"int", property_value:3},
          {label:"reps", value:"reps", data_type:"int", property_value:10},
          {label:"time_of_set", value:"time_of_set", data_type:"int", property_value:40},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"total_time", value:"total_time", data_type:"int", property_value:400},
          {label:"priority", value:"priority", data_type:"int", property_value:6}, // priority if must
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"weight",2:"sets",3:"reps",4:"time_of_set",5:"break_time"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{weight:80,sets:3,reps:10,time_of_set:40,break_time:90},checkpoint2:{weight:85,sets:3,reps:10,time_of_set:40,break_time:90}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"bicep tear",2:"upper traps overpower",3:"front shoulder overpower"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"great2"},2:{stars:5,comment:"great exercise2"},3:{stars:5,comment:"great great exercises2"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },

    {
        id:13, 
        name:"normal pull up",
        type:"item",
        description:"exercise - normal pull up",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
            {label:"exercise", value:"tag1"},
            {label:"back", value:"tag2"},
            {label:"lower traps", value:"tag3"},
            {label:"lats", value:"tag4"},
            {label:"abs", value:"tag5"},
            {label:"rotator cuff", value:"tag6"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"more specific explaination"},
          {label:"tempo", value:"tempo", data_type:"int" , property_value:1111},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"pinky hold tight",2:"fire lower trap first",3:"rigid movement"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}}, // pain 
          {label:"working_bodyparts_medical_names", value:"working_bodyparts_medical_names", data_type:"json", property_value:{lower_trap:4,side_lats:4,upper_lats:3,lower_lats:2}}, // wide back squat - primary and secendaries
          {label:"working_bodyparts_names", value:"working_bodyparts_names", data_type:"json", property_value:{lats:7,lower_trap:6}}, // wide back squat - primary and secendaries
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{successes:{1:{description:"good stability on back"},2:{description:"good straight back"}},fails:{1:{description:"weak lower traps",overcome:false},2:{description:"weak grip", overcome:false}}}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:7},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:7},
          {label:"complexity", value:"complexity", data_type:"int", property_value:8},
          {label:"weight", value:"weight", data_type:"int", property_value:70},
          {label:"sets", value:"sets", data_type:"int", property_value:3},
          {label:"reps", value:"reps", data_type:"int", property_value:10},
          {label:"time_of_set", value:"time_of_set", data_type:"int", property_value:40},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"total_time", value:"total_time", data_type:"int", property_value:400},
          {label:"priority", value:"priority", data_type:"int", property_value:5}, // priority if must
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"weight",2:"sets",3:"reps",4:"time_of_set",5:"break_time"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{weight:70,sets:3,reps:10,time_of_set:40,break_time:90},checkpoint2:{weight:80,sets:3,reps:10,time_of_set:40,break_time:90}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"posture",2:"snowball effect",3:"shoulders problems"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"great"},2:{stars:5,comment:"great exercise"},3:{stars:5,comment:"great great exercises"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },

    {
        id:14, 
        name:"normal push ups",
        type:"item",
        description:"exercise1 - normal push ups",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
            {label:"exercise", value:"tag1"},
            {label:"chest", value:"tag2"},
            {label:"front shoulder", value:"tag3"},
            {label:"abs", value:"tag4"},
            {label:"serratus", value:"tag5"},
            {label:"triceps", value:"tag5"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:"more specific explaination"},
          {label:"tempo", value:"tempo", data_type:"int" , property_value:1111},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"knees not inward",2:"knee carful pressure",3:"barbell travling straight down from side view"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}}, // pain 
          {label:"working_bodyparts_medical_names", value:"working_bodyparts_medical_names", data_type:"json", property_value:{chest_medical:5}}, // wide back squat - primary and secendaries
          {label:"working_bodyparts_names", value:"working_bodyparts_names", data_type:"json", property_value:{upper_chest:4,middle_chest:5,lower_chest:6,tricep:5,abs:4,front_shoulder:5}}, // wide back squat - primary and secendaries
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{successes:{1:{description:"good form"},2:{description:"good straight back"}},fails:{1:{description:"weak abs",overcome:false},2:{description:"weak serratus", overcome:false}}}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:3},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:3},
          {label:"complexity", value:"complexity", data_type:"int", property_value:8},
          {label:"weight", value:"weight", data_type:"int", property_value:70},
          {label:"sets", value:"sets", data_type:"int", property_value:3},
          {label:"reps", value:"reps", data_type:"int", property_value:10},
          {label:"time_of_set", value:"time_of_set", data_type:"int", property_value:40},
          {label:"break_time", value:"break_time", data_type:"int", property_value:90},
          {label:"total_time", value:"total_time", data_type:"int", property_value:400},
          {label:"priority", value:"priority", data_type:"int", property_value:5}, // priority if must
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"weight",2:"sets",3:"reps",4:"time_of_set",5:"break_time"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{weight:70,sets:3,reps:10,time_of_set:40,break_time:90},checkpoint2:{weight:130,sets:3,reps:10,time_of_set:40,break_time:90}}}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:7},
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"hip flexors overpower",2:"shoulder pain",3:"uneven chest"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"great"},2:{stars:5,comment:"great exercise"},3:{stars:5,comment:"great great exercises"}}}, //stars
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
]; 

const body_functions = [
    {
        id:15,
        name:"neck function",
        type:"item",
        description:"neck function desc",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"body_function", value:"body_function"},
          {label:"neck", value:"neck"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
        ],
        properties:[
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"notice if even"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:{neck:4}},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:{neck:5}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"need more streches"}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:2},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:2},
          {label:"priority", value:"priority", data_type:"int", property_value:3},
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"progress"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{progress:2},checkpoint2:{progress:3}}}, 
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"diffrent muscle"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great func"},3:{stars:5,comment:"great great func"}}}, //stars
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
    {
        id:16,
        name:"hamstring function",
        type:"item",
        description:"hamstring function desc",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"body_function", value:"body_function"},
          {label:"hamstring", value:"hamstring"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
        ],
        properties:[
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"notice if even",2:"working on stairs"}},
          {label:"requirements", value:"requirements", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:{1:null,2:null,3:null}},
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:{hamstring:4}},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:{hamstring:5}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"need more streches"}},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:2},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:2},
          {label:"priority", value:"priority", data_type:"int", property_value:3},
          {label:"progress", value:"progress", data_type:"int", property_value:1}, // progress on this
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:{1:"progress"}}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:{checkpoint1:{progress:2},checkpoint2:{progress:3}}}, 
          {label:"risks", value:"risks", data_type:"json", property_value:{1:"diffrent muscle usage"}},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great func"},3:{stars:5,comment:"great great func"}}}, //stars
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
];

const regimes = [
    {
        id:1,
        name:"streching_regime",
        type:"regime",
        description:"tab-1",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
          {label:"regime", value:"regime"},
          {label:"core", value:"core"},
        ],
        properties:[

          {label:"entries", value:"entries", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"workload", value:"workload", data_type:"json", property_value:{hamstring:7,traps:8}},
          {label:"order", value:"order", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"priorities", value:"priorities", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"alternatives", value:"alternatives", data_type:"json", property_value:{1:"",2:"",3:""}},

          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"tip1",2:"tip2"}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"eval1",2:"eval2"}},
          {label:"average_mental_difficulty", value:"average_mental_difficulty", data_type:"int", property_value:0},
          {label:"average_physical_difficulty", value:"average_physical_difficulty", data_type:"int", property_value:0},
          {label:"average_complexity", value:"average_complexity", data_type:"int", property_value:null},
          {label:"total_time", value:"total_time", data_type:"int", property_value:1300},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great regime"},3:{stars:5,comment:"great great regime"}}}, //stars
          {label:"training_plan_type", value:"training_plan_type", data_type:"string", property_value:"AB"},
          {label:"frequency", value:"frequency", data_type:"json", property_value:{week:4}},
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
    { //voice command scripts
        id:2,
        name:"training_regime",
        type:"regime",
        description:"tab-2",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
          {label:"core", value:"core"},
          {label:"regime", value:"regime"},
        ],
        properties:[ // 1 training regime 
          {label:"entries", value:"entries", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"workload", value:"workload", data_type:"json", property_value:{hamstring:7,traps:8}},
          {label:"order", value:"order", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"priorities", value:"priorities", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"alternatives", value:"alternatives", data_type:"json", property_value:{1:"",2:"",3:""}},

          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"tip1",2:"tip2"}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"eval1",2:"eval2"}},
          {label:"average_mental_difficulty", value:"average_mental_difficulty", data_type:"int", property_value:0},
          {label:"average_physical_difficulty", value:"average_physical_difficulty", data_type:"int", property_value:0},
          {label:"average_complexity", value:"average_complexity", data_type:"int", property_value:null},
          {label:"total_time", value:"total_time", data_type:"int", property_value:1300},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great regime"},3:{stars:5,comment:"great great regime"}}}, //stars
          {label:"training_plan_type", value:"training_plan_type", data_type:"string", property_value:"AB"},
          {label:"frequency", value:"frequency", data_type:"json", property_value:{week:4}},
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },

    {
        id:3,
        name:"body_functions_regime",
        type:"regime",
        description:"tab-5",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"regime", value:"regime"},
          {label:"core", value:"core"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
        ],
        properties:[
          {label:"entries", value:"entries", data_type:"json", property_value:{1:"",2:"",3:""}}, 
          {label:"workload", value:"workload", data_type:"json", property_value:{hamstring:7,traps:8}},
          {label:"order", value:"order", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"priorities", value:"priorities", data_type:"json", property_value:{1:"",2:"",3:""}},
          {label:"alternatives", value:"alternatives", data_type:"json", property_value:{1:"",2:"",3:""}},

          {label:"self_tips", value:"self_tips", data_type:"json", property_value:{1:"tip1",2:"tip2"}},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:{1:"eval1",2:"eval2"}},
          {label:"average_mental_difficulty", value:"average_mental_difficulty", data_type:"int", property_value:0},
          {label:"average_physical_difficulty", value:"average_physical_difficulty", data_type:"int", property_value:0},
          {label:"average_complexity", value:"average_complexity", data_type:"int", property_value:null},
          {label:"total_time", value:"total_time", data_type:"int", property_value:1300},
          {label:"reviews", value:"reviews", data_type:"json", property_value:{1:{stars:5,comment:"greatt"},2:{stars:5,comment:"great regime"},3:{stars:5,comment:"great great regime"}}}, //stars
          {label:"training_plan_type", value:"training_plan_type", data_type:"string", property_value:"AB"},
          {label:"frequency", value:"frequency", data_type:"json", property_value:{week:4}},
          {label:"benefits", value:"benefits", data_type:"json", property_value:{1:"benefit1",2:"benefit2",3:"benefit3"}},
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:{1:"drawback1",2:"drawback2",3:"drawback3"}},
          {label:"videos", value:"videos", data_type:"json", property_value:{1:{name:"vid1",path:"vid_path1"},2:{name:"vid2",path:"vid_path2"},3:{name:"vid3",path:"vid_path3"}}},
          {label:"links", value:"links", data_type:"json", property_value:{1:{name:"link1",path:"link_path1"},2:{name:"link2",path:"link_path2"},3:{name:"link3",path:"link_path3"}}},
          {label:"gifs", value:"gifs", data_type:"json", property_value:{1:{name:"gif1",path:"gif_path1"},2:{name:"gif2",path:"gif_path2"},3:{name:"gif3",path:"gif_path3"}}},
          {label:"pictures", value:"pictures", data_type:"json", property_value:{1:{name:"pic1",path:"picture_path1"},2:{name:"pic2",path:"picture_path2"},3:{name:"pic3",path:"picture_path3"}}},
        ]
    },
];

const pools = [
    {
        id:4,
        name:"exercises",
        type:"pool",
        description:"tab-3",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"exercises", value:"exercises"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
        ],
        properties:[//for exercise in exercises ,exercise has ____
          {label:"usecase", value:"usecase", data_type:"string" , property_value:null},
          {label:"tempo", value:"tempo", data_type:"int" , property_value:null},
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:null},
          {label:"requirements", value:"requirements", data_type:"json", property_value:null },// entry_id  -if entry is underconstruction , warning isgn
          {label:"related_entries", value:"related_entries", data_type:"json", property_value:null}, 
          {label:"working_bodyparts_medical_names", value:"working_bodyparts_medical_names", data_type:"json", property_value:null},
          {label:"working_bodyparts_names", value:"working_bodyparts_names", data_type:"json", property_value:null},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:null},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:null},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:null},
          {label:"complexity", value:"complexity", data_type:"int", property_value:null},
          {label:"weight", value:"weight", data_type:"int", property_value:null},
          {label:"sets", value:"sets", data_type:"int", property_value:null},
          {label:"reps", value:"reps", data_type:"int", property_value:null},
          {label:"time_of_set", value:"time_of_set", data_type:"int", property_value:null},
          {label:"break_time", value:"break_time", data_type:"int", property_value:null},
          {label:"total_time", value:"total_time", data_type:"int", property_value:null},
          {label:"priority", value:"priority", data_type:"int", property_value:null},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:null},
          {label:"risks", value:"risks", data_type:"json", property_value:null},
          {label:"reviews", value:"reviews", data_type:"json", property_value:null}, // userid, stars(= recommended or nah)
          {label:"progress", value:"progress", data_type:"int", property_value:null}, 
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:null}, 
          {label:"progress_checkpoints", value:"progress_checkpoints", data_type:"json", property_value:null}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:null},   // could be infinite
          {label:"drawbacks", value:"drawbacks", data_type:"json", property_value:null},
          {label:"videos", value:"videos", data_type:"json", property_value:null}, // name , path, cut time, etc
          {label:"links", value:"links", data_type:"json", property_value:null}, // name , path , description
          {label:"gifs", value:"gifs", data_type:"json", property_value:null}, // 
          {label:"pictures", value:"pictures", data_type:"json", property_value:null},
        ]
    },

    {
        id:5,
        name:"streches",
        type:"pool",
        description:"tab-4",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"streches", value:"streches"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
        ],
        properties:[
          {label:"usecase", value:"usecase", data_type:"string" , property_value:null},
          {label:"tips", value:"tips", data_type:"string", property_value:null},
          {label:"requirements", value:"requirements", data_type:"json", property_value:null},
          {label:"related", value:"related", data_type:"json", property_value:null}, 
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:null},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:null},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:null},
          {label:"mental_difficulty", value:"mental_difficulty", data_type:"int", property_value:null},
          {label:"physical_difficulty", value:"physical_difficulty", data_type:"int", property_value:null},
          {label:"complexity", value:"complexity", data_type:"int", property_value:null},
          {label:"time_len", value:"time_len", data_type:"int", property_value:null},
          {label:"total_time", value:"total_time", data_type:"int", property_value:null},
          {label:"priority", value:"priority", data_type:"int", property_value:null},
          {label:"risk_level", value:"risk_level", data_type:"int", property_value:null},
          {label:"risks", value:"risks", data_type:"json", property_value:null},
          {label:"reviews", value:"reviews", data_type:"json", property_value:null},
          {label:"progress", value:"progress", data_type:"int", property_value:null}, 
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:null}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:null}, 
          {label:"videos", value:"videos", data_type:"json", property_value:null},
          {label:"links", value:"links", data_type:"json", property_value:null},
          {label:"gifs", value:"gifs", data_type:"json", property_value:null},
          {label:"pictures", value:"pictures", data_type:"json", property_value:null},
        ]
    },
    {
        id:6,
        name:"human natural body functions",
        type:"pool",
        description:"tab-6",
        state_type:"UNDERCONSTRUCTION",
        state:"UNDERCONSTRUCTION",
        tags:[
          {label:"streches", value:"streches"},
          {label:"health", value:"health"},
          {label:"physical", value:"physical"},
        ],
        properties:[
          {label:"self_tips", value:"self_tips", data_type:"json", property_value:null},
          {label:"requirements", value:"requirements", data_type:"json", property_value:null},
          {label:"related", value:"related", data_type:"json", property_value:null}, 
          {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:null},
          {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:null},
          {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:null},
          {label:"mental_diff", value:"mental_diff", data_type:"int", property_value:null},
          {label:"physical_diff", value:"physical_diff", data_type:"int", property_value:null},
          {label:"priority", value:"priority", data_type:"int", property_value:null},
          {label:"risks", value:"risks", data_type:"json", property_value:null},
          {label:"reviews", value:"reviews", data_type:"json", property_value:null},
          {label:"progress", value:"progress", data_type:"int", property_value:null}, 
          {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:null}, 
          {label:"benefits", value:"benefits", data_type:"json", property_value:null}, 
          {label:"videos", value:"videos", data_type:"json", property_value:null},
          {label:"links", value:"links", data_type:"json", property_value:null},
          {label:"gifs", value:"gifs", data_type:"json", property_value:null},
          {label:"pictures", value:"pictures", data_type:"json", property_value:null},
        ]
    },

    // {
    //     id:"7",
    //     name:"body troubleshooting",
    //     type:"pool",
    //     description:"tab-7, pain and etc",
    //     state_type:"UNDERCONSTRUCTION",
    //     state:"UNDERCONSTRUCTION",
    //     tags:[
    //       {label:"wiki", value:"wiki"},
    //       {label:"health", value:"health"},
    //       {label:"physical", value:"physical"},
    //     ],
    //     properties:[
    //       {label:"self_tips", value:"self_tips", data_type:"json", property_value:null},
    //       {label:"requirements", value:"requirements", data_type:"json", property_value:null},
    //       {label:"related", value:"related", data_type:"json", property_value:null}, 
    //       {label:"bodyparts", value:"bodyparts", data_type:"json", property_value:null},
    //       {label:"bodyparts_easynames", value:"bodyparts", data_type:"json", property_value:null},
    //       {label:"self_evaluation", value:"self_evaluation", data_type:"json", property_value:null},
    //       {label:"mental_diff", value:"mental_diff", data_type:"int", property_value:null},
    //       {label:"physical_diff", value:"physical_diff", data_type:"int", property_value:null},
    //       {label:"total_time", value:"total_time", data_type:"int", property_value:null},
    //       {label:"priority", value:"priority", data_type:"int", property_value:null},
    //       {label:"risks", value:"risks", data_type:"json", property_value:null},
    //       {label:"reviews", value:"reviews", data_type:"json", property_value:null},
    //       {label:"progress", value:"progress", data_type:"int", property_value:null}, 
    //       {label:"progress_fields", value:"progress_fields", data_type:"json", property_value:null}, 
    //       {label:"videos", value:"videos", data_type:"json", property_value:null},
    //       {label:"links", value:"links", data_type:"json", property_value:null},
    //       {label:"gifs", value:"gifs", data_type:"json", property_value:null},
    //       {label:"pictures", value:"pictures", data_type:"json", property_value:null},
    //     ]
    // },
];

const entriesData = [...streches,...exercises,...body_functions];
const tabs = [...regimes,...pools];

const tabsHeadersPrep = tabs.map((tab)  => tab.name);
const tabsHeaders = tabsHeadersPrep.map((tab)  => tab.split(' ').join('_'));





const tabsData = tabs.map((tab)=>{
    return {...tab, entries:
        entryEdges.map((entry)=>{
            if (entry.entry_parent_ID === tab.id){
                return entriesData.filter((item)=>item.id === entry.entry_child_ID);
            }
                return false;   
            }).filter(entry=>entry !== false)
    }
})
// const readyTabs = tabsData.map((tab) => {
//     return {...tab,entries: 
//     tab.entries.map((entry_id) => {
//         entriesData.filter(entry => entry.id === entry_id)
//     })}
// })


export {entriesData,tabsData}