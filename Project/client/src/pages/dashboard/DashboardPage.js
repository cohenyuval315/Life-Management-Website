import React from 'react'
import './DashboardPage.css'
import Content from '../../features/Dashboard/Content';
import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';

const originalItems = ["a","b","c","e"]
const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4 },
    { i: "b", x: 1, y: 0, w: 3, h: 4 },
    { i: "c", x: 0, y: 4, w: 2, h: 4 },
    { i: "e", x: 0, y: 4, w: 2, h: 4 }
  ]
};

const TestCom = () => {
  return (
    <div>
      Widget
    </div>
  )
}


const componentList = {
  a: TestCom,
  b: TestCom,
  c: TestCom,
  e: TestCom,

};
const DashboardPage = () => {
  return (
      <>
        <AppTopSidebarDrawer/>
        <AppLeftSidebarDrawer >
              
        </AppLeftSidebarDrawer>
        <AppBodyContent title={"dashbaord"} >
            <div style={{width:"100%"}}>
              <Content pageName={"dashboard"} originalItems={originalItems} initialLayouts={initialLayouts} componentList={componentList}/>
            </div>
        </AppBodyContent>
        <AppRightSidebarMiniDrawer />
        <AppBottomBar />  
      </>
  )
}

export default DashboardPage