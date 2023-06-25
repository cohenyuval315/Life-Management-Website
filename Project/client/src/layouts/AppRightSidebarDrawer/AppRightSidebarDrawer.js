import React,{useState} from 'react'
import './AppRightSidebarDrawer.css'
import useKeyPress from '../../hooks/useKeyPress'

const AppRightSidebarDrawer = ({children}) => {
    const [isOpen,setIsOpen] = useState(false)

    const onKeyPress = (event) => {
        setIsOpen(!isOpen)
        console.log(`key pressed: ${event.key}`);
    };

    useKeyPress(["c"],onKeyPress)

  return (
    <>  
        {isOpen ? (
            <div id='appbodycontent-right-sidebar-drawer-container'>
                {children} 
            </div>
        ) : null}
    </>
  )
}

export default AppRightSidebarDrawer