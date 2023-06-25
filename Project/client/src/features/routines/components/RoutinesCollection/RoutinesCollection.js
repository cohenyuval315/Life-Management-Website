import React,{useEffect,useState} from 'react'
import { getRoutines } from '../../../../services/api/index'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import RoutineForm from '../../../../components/form/RoutineForm';
import './RoutineCollection.css'
import { ListItemButton } from '@mui/material';
import { withStyles } from "@material-ui/core/styles";
import DataModal from '../../../../components/ui/Modal/DataModal';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));
const label = { inputProps: { 'aria-label': 'Color switch demo' } };


const StyledListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "purple",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      "& .MuiListItemIcon-root": {
        color: "black"
      }
    }
  },
  selected: {}
})(ListItem);


const RoutinesCollection = () => {

  const [userRoutines,setUserRoutines] = useState(null)
  const [selectedRoutine,setSelectedRoutine] = useState(null)



  useEffect(() => {
    getRoutines().then(data=>{
      console.log("routines",data)
      setUserRoutines(data)
    })
  
    return () => {
      
    }
  }, [])
  

  return (
    <div className='routinesCollectionContainer'>
        {(userRoutines!==null) && (
        <div className='routinesContainer'>
          <div className='routinesLayout'>
            <RoutinesList routines={userRoutines} handleSetSelectedRoutine={handleSetSelectedRoutine}/>
          </div>
          <div className='routineContent'>
            {(selectedRoutine!==null)&&(
              <div  className='routineLayout'>
                <RoutineLayout routine={selectedRoutine}/>
              </div>
            )}
            {(selectedRoutine === null)&&(
              <div className='routineForm'> 
                  <div>
                    create new routine
                  </div>
                  <div>
                    <RoutineForm/>
                  </div>
              </div>
            )}
          </div>
        </div>
        )}
    </div>
  );


  function handleSetSelectedRoutine(routine){
      setSelectedRoutine((prev)=>routine)
  }

  function handleSetUserRoutines(){
  }

  function isRoutineScheduled(){
      return false
  }

}


const RoutinesHeader = () => {
    return (
      <div className='routinesSubheader'>
          routines
      </div>
    );
}


const RoutinesList = ({routines, handleSetSelectedRoutine}) => {

  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <div className='routinesList'>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}
        subheader={<RoutinesHeader/>}
      >
          {(routines !== undefined && routines !== null) && (
              <div className='routineListItems'>
                  {routines.map((routine)=>{
                      return (  
                          <div className='routineItem' key={routine.id}>
                              <StyledListItem >
                                  <ListItemIcon>
                                      <GradeIcon/>
                                  </ListItemIcon>
                                  <ListItemText id={`${routine.id} text`} primary={routine.event.title} />
                                    <ListItemButton edge="end" onClick={(e)=>handleSetSelectedRoutine(routine)}>
                                          <ListItemIcon>
                                                <EditIcon/>
                                          </ListItemIcon>
                                    </ListItemButton>
                                    <StyledSwitch
                                      {...label}
                                      edge="end"
                                      onChange={handleToggle('wifi')}
                                      checked={checked.indexOf('wifi') !== -1}
                                    />
                              </StyledListItem>
                          </div>
                      );
                  })}
              </div>
          )}

      </List>
  </div>
  )
}


const RoutineLayout = ({routine}) => {
  const id = routine.id
  const event = routine.event
  const durationObjects = routine.durationObjects
  console.log(durationObjects)
  const n = durationObjects.length

  topologicalSort(n)

  function getEdges(){

      let listOfEdges = []
      durationObjects.map((dObj)=>{
          dObj.parentIds.map((ObjParentId)=>{
              listOfEdges.push([ObjParentId,dObj.objectId])
          })
      })
      return listOfEdges
  }

  function getVertices (){
      return [...durationObjects.map((dObj)=>dObj.objectId)]
  }

  // function getConnections(durationObjects){
  //     const connections = new Map();
  //     const edges = getEdges(durationObjects)
  //     const vertices = getVertices(durationObjects)
  //     vertices.forEach((state) => {
  //       connections.set(state, []);
  //     });
  //     // undirected
  //     // edges.forEach(edge => {
  //     //   const child = [...edge][0];
  //     //   const parent = [...edge][1];
        
  //     //   connections.get(child).push(parent);
  //     //   connections.get(parent).push(child);
  //     // });
  //     edges.forEach(edge => {
  //       connections.get([...edge][0]).push([...edge][1]);
  //     });

  //     return connections
  // }

  function getAdjecentList(n){
    const indexesNames = getVertices()
    const adj = new Array(n)
    for (let i = 0 ; i < n ; i+=1){
        adj[indexesNames[i]] = new Array()
    }
    getEdges().forEach((edge)=>{
        const v = edge[0]
        const w = edge[1]
        adj[v].push(w)
    })
    return adj
    
  }

  function topologicalSort(n)
  { 
      const level = 0
      const indexesNames = getVertices()
      let stack = new Array()
      let adj = getAdjecentList(n)
      // Mark all the vertices as not visited
      let visited = new Array(n);
      for (let i = 0 ; i < n ; i++){
          visited[indexesNames[i]] = false;
      }

      // Call the recursive helper
      // function to store
      // Topological Sort starting
      // from all vertices one by one
      for (let i = 0 ; i < n ; i++){
          if (visited[indexesNames[i]] == false){
              topologicalSortUtil(indexesNames[i], visited, stack,n,adj,level);
          }
      }

      // Print contents of stack
      while (stack.length != 0){
          console.log(stack.pop() + " ")
      }
  }

  function topologicalSortUtil(v, visited, stack,n,adj,level)
  {
      // Mark the current node as visited.
      visited[v] = true;
      let i = 0;
      // Recur for all the vertices adjacent
      // to thisvertex
      for(i = 0 ; i < adj[v].length ; i++){
          if(!visited[adj[v][i]]){
              topologicalSortUtil(adj[v][i], visited, stack,n,adj,level+1)
          }
      }

      // Push current vertex to stack
      // which stores result
      stack.push(v +","+ level);
  }
 
  return (
    <div className='routineHeader'>
          <div>
            edit routine
            <DataModal><RoutineForm routine={routine}/></DataModal>
          </div>

          <div>

          </div>
    </div>
  )
}


export default RoutinesCollection