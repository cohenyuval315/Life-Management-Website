import React,{useEffect,useState} from 'react'
import ReactJson from 'react-json-view'
import StyledButtom from '../../../components/ui/Button/StyledButton'
import { getUserBackups,DATETIME_BACKUP_FORMAT,loadUserBackup, getUserData, saveCurrentUserData ,deleteUserBackup} from '../../../services/api/index'
import moment from 'moment'

import './UserSavesForm.css'

const UserSavesForm = () => {
    const [saves,setSaves] = useState(null)
    const [selectedSave,setSelectedSave] = useState()
    const [open,setOpen] = useState(false)
    const [currentData,setCurrentData] = useState(null)
    const [selectedSaveIndex,setSelectedSaveIndex] = useState(null)

  function fetchBackups(){
      getUserBackups().then(data=>{
          const sortedDataByDate = data.sort((a,b)=>{
              if (!moment(a).isBefore(moment(b))){
                  return  -1 
              }
              return 1
          })
          setSaves(sortedDataByDate)
      })
  }
  function fetchCurrentUserData(){
      getUserData().then(data=>{
          setCurrentData(data)
      })
  }
  useEffect(() => {

  fetchBackups()
  fetchCurrentUserData()

    return () => {
      
    }
  }, [])
  
  function handleSetOpen(index){
      setOpen(!open)
      const save = saves[index]
      setSelectedSaveIndex(index)
      setSelectedSave(save)
  }
  function handleDeleteSave(date){
    if(!window.confirm("are you sure to delete?")){
        return
    }
    deleteUserBackup(date).then(data=>{
        fetchBackups()
    })

  }
  function handleLoadSave(date){
    if(!window.confirm("are you sure to load?")){
        return
    }
    loadUserBackup(date).then(data=>{
      fetchBackups()
      fetchCurrentUserData()
    })


  }
  function handleSaveCurrent(){
    if(!window.confirm("are you sure to save?")){
        return
    }
    saveCurrentUserData().then(data=>{
        fetchBackups()
    })
  }

  useEffect(() => {
    if(open === true){
    }
  
    return () => {
      
    }
  }, [open])
  
  return (
    <div> 
        {(currentData !== null && currentData !== undefined && saves!== null && saves !== undefined)&&(
          <div className='savesContainer'>
              <div className='currentSave'>
                  <div className='currentSaveLabel'>
                      current data:
                  </div>
                  <div className='currentSaveData'>
                  <ReactJson
                      src={currentData}
                      collapsed={true}
                      theme="monokai"

                      sortKeys={true}
                      displayDataTypes={false}
                      displayObjectSize={false}
                      indentWidth={4}
                      collapseStringsAfterLength={20}
                      style={{fontSize:"18px"}}
                  />
                  </div>
                  <div className='currentSaveButtons'>
                     <StyledButtom name={"save"} handleOnClick={handleSaveCurrent}/>
                  </div>
              </div>

              <div className='userBackups'>
                <div className='userBackupsLabel'>  
                      old backups:
                </div>

                <ul className='userBackupsList'>
                  {saves.map((save,index)=>{
                    return (
                        <li key={save.date} className="saveListItem" >
                            <div className='saveItem'>
                                  {index}.  save :
                              <div className='saveItemLabel'>
                                    datetime:  {save.date} 
                                     
                              </div>
                                <div className='saveItemButtons'>
                                      <StyledButtom name={"delete"} handleOnClick={(e)=>handleDeleteSave(save.date)}/>
                                      <StyledButtom name={"load"} handleOnClick={(e)=>handleLoadSave(save.date)}/>
                                      <StyledButtom name={selectedSaveIndex===index && open===true?"less":"more"} handleOnClick={()=>handleSetOpen(index)}/>
                                </div>
                                <div className='saveData'> 
                                        {(selectedSaveIndex===index && open===true && selectedSave !== undefined && selectedSave !== null)&&(
                                          <ReactJson
                                              src={selectedSave['data']}
                                              theme="monokai"
                                              collapsed={true}
                                              sortKeys={true}
                                              displayDataTypes={false}
                                              displayObjectSize={false}
                                              indentWidth={4}
                                              collapseStringsAfterLength={20}
                                              style={{fontSize:"18px"}}
                                          />
                                      )}
                                </div>
       
                          </div>
                        </li> 
                    );
                  })}
                </ul>
              </div>
          </div>
        )}
    </div>
  )
}

export default UserSavesForm