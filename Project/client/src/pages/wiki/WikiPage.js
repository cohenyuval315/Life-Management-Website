import React,{useState,forwardRef,useRef,useEffect} from 'react';
import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';
// import Markdown from 'markdown-to-jsx';
import {NotesList,NOTES_DATA,NewNote,NotesListHeader,Note,EditNote} from '../../features/notes/index'
import { Navigate, Outlet, Route, Routes ,Link} from 'react-router-dom';
import { StarIcon } from '../../assets/icons';
import SearchBar from '../../components/common/SearchBar';
import AppRightSidebarDrawer from '../../layouts/AppRightSidebarDrawer';
import {TemplatesList,TemplatesListHeader } from '../../features/templates/index'



const NotesHeader = ({item}) => {
  return (
    <>
        <div style={{border:"1px solid white"}}>
            {item.component?item.component:item.label}
        </div>
    </>
  )
}

const headerButton = <button onClick={()=><Link to={'/new'}></Link>}>new</button>

const headersData = [
    {
        id:"1",
        label:"add",
        component:headerButton
    },
    {
        id:"2",
        label:"header2"
    },
    {
        id:"3",
        label:"add"
    },
]
const Headers = headersData.map((item)=>{return {component:<NotesHeader item={item}/>}})




const notesData = [
  {
    id:"noteLabel1",
    title:"title",
    label:"titlde",
    isPinned:true,
    note:"",
    created:"",
    updated:"",
    tags:[],

  },
  {
    id:"noteLabel2",
    title:"atitle2",
    label:"title2a",
    isPinned:true,
    note:"",
    created:"",
    updated:"",
    tags:[],

  }
]
const templatesData = [
  {
    id:"noteLabel1",

  }
]

const tabs = ['favorites','default'];

const WikiPage = () => {
    const ref = useRef(null);
    const sortOptions = ['numAsc','numDesc','strAsc','strDesc']
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    
    const [notes,setNotes] = useState(notesData);
    const [tabNotes,setTabNotes] = useState(notes)
    const [searchedNotes,setSearchedNotes] = useState(tabNotes)
    const [templates,setTemplates] = useState([]);
    const [activeNote,setActiveNote] = useState(notes[0]);
    const [selectedTab,setSelectedTab] = useState(tabs[0]);




    function handleSetActiveNote(e){
        setActiveNote(e)
    }

    function handleSetSearchNotes(data){
        
        setSearchedNotes(data) 
    }

    function handleSetTemplates(data){
    }



    function handleCreateNote(){

    }

    function handleDeleteNote(){

    }

    function handleUpdateNote(){

    }

    

    function handleCreateTemplate(e){
    }

    function handleDeleteTemplate(e){
    }

    function handleUpdateTemplate(e){
    }



    function fetchNotes(){
    }

    function fetchTemplates(){
    }


    useEffect(() => {
      normalizeNotes()
      updateSelectedTabNotes()
      updatedSortedTabNotes()
    }, [])


    useEffect(() => {
      updateSelectedTabNotes()
    }, [selectedTab])


    useEffect(() => {
      updatedSortedTabNotes()
    }, [sortBy])
    

    // 👇️ sort by Numeric property ASCENDING (1 - 100)
    const numAscending = (arr) => [...arr].sort((a, b) => a.id - b.id);

    // 👇️ sort by Numeric property DESCENDING (100 - 1)
    const numDescending =(arr) => [...arr].sort((a, b) => b.id - a.id);

    // 👇️ sort by String property ASCENDING (A - Z)
    const strAscending = (arr) => [...arr].sort((a, b) =>
      a.title > b.title ? 1 : -1,
    );

    // 👇️ sort by String property DESCENDING (Z - A)
    const strDescending = (arr) => [...arr].sort((a, b) =>
      a.title > b.title ? -1 : 1,
    );


    function normalizeNotes(){
      setNotes(notes.map((note)=>{
        note.tab = 'default';
        if(note.isPinned){
            note.tab = 'favorites';
        }
        return note
      }))
    }

    function updateSelectedTabNotes(){
        setTabNotes(notes.filter((note)=>note.tab===selectedTab))
    }

    function updatedSortedTabNotes(){
      let sorted = tabNotes

      if (sortBy === sortOptions[0]){
        sorted = numAscending(tabNotes)
      }
      if (sortBy === sortOptions[1]){
        sorted = numDescending(tabNotes)
      }
      if (sortBy === sortOptions[2]){
        sorted = strAscending(tabNotes)
      }
      if (sortBy === sortOptions[3]){
        sorted = strDescending(tabNotes)
      }
      setTabNotes(sorted)
    }

  return (
      <>

        <AppTopSidebarDrawer/>
        <AppLeftSidebarDrawer>
          <div style={{display:"block"}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <NotesListHeader activeItem={activeNote} onCreate={handleCreateNote}/>
                <SearchBar data={notes} searchedData={searchedNotes}  setSearchData={handleSetSearchNotes} objectKey={"title"}/>
                <Tabs data={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              </div>
              <NotesList sortOptions={sortOptions} sortBy={sortBy}  notes={tabNotes} onSort={setSortBy} activeNote={activeNote} setActiveNote={handleSetActiveNote}  onUpdate={handleUpdateNote} onDelete={handleDeleteNote} />
          </div>
        </AppLeftSidebarDrawer>
        <AppBodyContent title={"notes"} >
            <div style={{display:"block"}}>
          <div>
          {/* <Markdown>
                  # Hello world! [Link text](/myMDfile)

          </Markdown> */}
            </div>
            <div>
            <Routes>
              <Route path='/new' element={<NewNote/>}/>
              <Route path='/:id'>
                  <Route index element={<Note note={activeNote}/>}/>
                  <Route path='edit' element={<EditNote note={activeNote}/>}/>
              </Route>
              <Route path='/*' element={<Navigate to={'/wiki/new'}/>}/>
            </Routes>
            </div>
            </div>
        </AppBodyContent>
        <AppRightSidebarMiniDrawer items={[]} />
        <AppRightSidebarDrawer>
              <TemplatesListHeader onCreate={handleCreateTemplate} />
              <SearchBar data={templates} setSearchData={handleSetTemplates} objectKey={"id"}/>
              <TemplatesList templates={templates} onDelete={handleDeleteTemplate} onUpdate={handleUpdateTemplate}/>
        </AppRightSidebarDrawer>
        <AppBottomBar />
      </>
  );
}



export const Tabs = ({data,selectedTab,setSelectedTab}) => {
  return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
        {data.map((tabLabel)=>(
            <div key={tabLabel} onClick={()=>setSelectedTab(tabLabel)} style={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",paddingLeft:"10px",paddingRight:"10px",paddingBottom:"5px",paddingTop:"5px" ,flex:"1 1 0px",border:"1px solid white", backgroundColor:selectedTab===tabLabel?"gray":"black"}}>{tabLabel}</div>
        ))}
    </div>
  )
}




export default WikiPage






