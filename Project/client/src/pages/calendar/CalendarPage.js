import React from 'react'
import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';
// import MyCalendarWrapper from '../../features/schedule/index'

const CalendarPage = () => {
  return (
    <>
        <AppTopSidebarDrawer/>
        <AppLeftSidebarDrawer >
              
        </AppLeftSidebarDrawer>

        <AppBodyContent title={"calendar"} >
            {/* <MyCalendarWrapper/> */}
        </AppBodyContent>

        <AppRightSidebarMiniDrawer />
        <AppBottomBar />
    </>
  )
}

export default CalendarPage