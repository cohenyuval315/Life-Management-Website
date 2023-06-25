import React,{useState} from 'react'
import './AppTopSidebarDrawer.css'
import useKeyPress from '../../hooks/useKeyPress'


const AppTopSidebarDrawer = ({items,children}) => {
    const [isOpen,setIsOpen] = useState(false)

    const onKeyPress = (event) => {
        setIsOpen(!isOpen)
        console.log(`key pressed: ${event.key}`);
    };

    useKeyPress(["t"],onKeyPress)

  return (
    <>
    {isOpen ? (
        <div id='apptopsidebar-drawer-container'>
          <div id='apptopsidebar-drawer-flexbox'>
            {items?items.map((item,index)=>(
              <div key={index} id='apptopsidebar-drawer-flexbox-item'>
                  {item}
              </div>
            )):(<div>{children}</div>)}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AppTopSidebarDrawer