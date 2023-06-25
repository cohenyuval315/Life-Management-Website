import React,{useState} from 'react'
import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';
import Modal from '../../layouts/modal/Modal';
import {RoutineForm, RoutinesList,RoutinesListHeader } from '../../features/routines/index'


const BodyContentItems = {
  leftHeaderItems:[],
  title:"Routines",
  rightHeaderItems:[],
}

const LeftSideDrawerItems ={
  headerItems:[{component:""}],
  bodyHeaderItems:[{component:""}],
  bodyItemsList:[{component:""}]
}
const leftDrawer ={
  headerItems:[{component:""}],
}


const RoutinesPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
      setIsOpen(!isOpen)
  };
  function handleModal(bool){
      setIsOpen(bool)
  }

  return (
      <>
           
          <AppTopSidebarDrawer/>
          <AppLeftSidebarDrawer {...leftDrawer}>
            <button onClick={toggleModal}>open modal</button>
          </AppLeftSidebarDrawer>

          <AppBodyContent  {...BodyContentItems}>

            <div className='routines-page-body-container'>
              <RoutinesListHeader/>
              <RoutinesList/>
            </div>



          </AppBodyContent>
          <AppRightSidebarMiniDrawer />
          <AppBottomBar />
          {isOpen && (
          <Modal handleModal={handleModal}>
              <RoutineForm/>
          </Modal>)}
      </>
  )
}

export default RoutinesPage