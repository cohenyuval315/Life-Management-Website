import React, { useCallback, useState } from 'react'

import AppTopSidebarDrawer from '../../layouts/AppTopSidebarDrawer';
import AppLeftSidebarDrawer from '../../layouts/AppLeftSidebarDrawer';
import AppBodyContent from '../../layouts/AppBodyContent';
import AppRightSidebarMiniDrawer from '../../layouts/AppRightSidebarMiniDrawer';
import AppBottomBar from '../../layouts/AppBottomBar';
import PixiApp from '../../features/graphs/PixiD3Graph/PixiApp'
import Graph from '../../features/graphs/Graph/Graph';
// import D3Graph from '../../features/graphs/D3Graph/D3Graph';
// const DomComp = () => {

//     const [items,setItems] = useState([])
//     const loadmore = useCallback(()=>{
//           setItems([...items,`${items.length}_item`])
//     },[setItems])
//     return (
//       <div className=''>
//           {(items.map((item)=>(
//             <div key={item}>{item}</div>
//           )))}
//           <button onClick={loadmore}>load more</button>
//       </div>
//     )
// }


const WorkspacePage = () => {




  return (
    <>



            <AppTopSidebarDrawer/>
            <AppLeftSidebarDrawer >
                  
            </AppLeftSidebarDrawer>

            <AppBodyContent title={"graph"} >
            {/* <D3Graph/> */}
            </AppBodyContent>

            <AppRightSidebarMiniDrawer />
            <AppBottomBar />

            <Graph>
              <PixiApp />
            </Graph>


    </>
  )
}

export default WorkspacePage