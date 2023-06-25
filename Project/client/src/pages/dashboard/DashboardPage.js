import React from 'react'
import './DashboardPage.css'
// import Content from '../../features/Dashboard/Content';
const originalItems = ["a"]
const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4 },
    // { i: "b", x: 1, y: 0, w: 3, h: 4 },
    // { i: "c", x: 0, y: 4, w: 2, h: 4 },
    // { i: "e", x: 0, y: 4, w: 2, h: 4 }
  ]
};

const TestCom = () => {
  return (
    <div>
erererere
    </div>
  )
}


const componentList = {
  a: TestCom,


};
const DashboardPage = () => {
  return (
      <div>
        {/* <Content pageName={"dashboard"} originalItems={originalItems} initialLayouts={initialLayouts} componentList={componentList}/> */}
      </div>
  )
}

export default DashboardPage