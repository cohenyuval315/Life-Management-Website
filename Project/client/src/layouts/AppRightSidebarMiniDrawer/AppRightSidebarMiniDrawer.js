import React, { useState,useEffect } from 'react'
import useKeyPress from '../../hooks/useKeyPress'
import './AppRightSidebarMiniDrawer.css'

const AppRightSidebarMiniDrawer = ({items,children}) => {
    const [isOpen,setIsOpen] = useState(false)

    const onKeyPress = (event) => {
        setIsOpen(!isOpen)
        console.log(`key pressed: ${event.key}`);
    };

    useKeyPress(["a"],onKeyPress)

    // useEffect(() => {
    //     if (props.clickedKey === 'a' && isOpen === false){
    //         setIsOpen(true)
    //     }
    //     if (props.clickedKey === 'a' && isOpen === true){
    //         setIsOpen(false)
    //     }    
    // }, [props.clickedKey])
    
  return (
    <>
        {isOpen ? (
        <div id='apprightsidebar-mini-drawer'>
            <div id='apprightsidebar-mini-drawer-flexbox'>
                {items?items.map((item,index)=>(
                    <div key={index} id='apprightsidebar-mini-drawer-flexbox-item'>
                        {item}
                    </div>
                )):(<div>{children}</div>)}
            </div>
        </div>) : null}
    </>
  )
}

export default AppRightSidebarMiniDrawer