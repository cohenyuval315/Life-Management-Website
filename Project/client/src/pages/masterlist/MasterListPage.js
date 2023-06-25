import React,{useState} from 'react';

import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';
import SortableMasterList from '../../components/masterlist';



const MasterListPage = () => {

  return (
      <>
           
            <AppTopSidebarDrawer/>
            <AppLeftSidebarDrawer >
                  
            </AppLeftSidebarDrawer>
            <AppBodyContent title={"MasterList"} >

                <SortableMasterList/>
            </AppBodyContent>
            <AppRightSidebarMiniDrawer />
            <AppBottomBar />


      </>
  );
}

export default MasterListPage