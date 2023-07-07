import React,{useState,useEffect, useRef, createRef} from 'react';
import './HomePage.css';
import {homePageRightHeadersItems,homePageLeftHeadersItems} from './header/HeaderData'
import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';
import Modal from '../../layouts/modal/Modal';
import Tree,{DUMMY} from '../../components/MiniTreeView/index';
import MultiTriggerExample from '../../layouts/ContextMenu/Menu';
import ContextMenu from '../../layouts/ContextMenu/ContextMenu';


const BodyContentItems = {
  leftHeaderItems:homePageLeftHeadersItems,
  title:"Home",
  rightHeaderItems:homePageRightHeadersItems,
}

const LeftSideDrawerItems ={
  headerItems:[{component:""}],
  bodyHeaderItems:[{component:""}],
  bodyItemsList:[{component:""}]
}
const leftDrawer ={
  headerItems:[{component:""}],
}

const HomePage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [sideBarContent, setSideBarContent] = useState();


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
                    <Tree data={DUMMY}/>
            </AppLeftSidebarDrawer>
            <AppBodyContent  {...BodyContentItems}>
                <button onClick={toggleModal}>open modal</button>
            </AppBodyContent>
            <AppRightSidebarMiniDrawer />
            <AppBottomBar />

              {isOpen && (
              <Modal handleModal={handleModal}>
              </Modal>)}
      </>
  );
}

export default HomePage