import React,{useState} from 'react'
import './AppLeftSidebarDrawer.css'
import useKeyPress from '../../hooks/useKeyPress'

const AppLeftSidebarDrawer = ({headerItems,bodyHeaderItems,bodyItemsList,children}) => {

    const [isOpen,setIsOpen] = useState(false)

    const onKeyPress = (event) => {
        setIsOpen(!isOpen)
    };

    useKeyPress(["x"],onKeyPress)
    return (
        <>
        {(isOpen?(
        <div id='appleftsidebardrawer-container'>
            <div id='appleftsidebardrawer-vertical-flexbox'>

                {(headerItems?(
                <div id='appleftsidebardrawer-header-horizontal-flex'>

                    {headerItems.map((item,index)=>(
                        <div key={index} id='appleftsidebardrawer-header-horizontal-flex-item'>
                            {item.component}
                        </div>
                    ))}
                </div>
                ):null)}

            {children?(
                <div id='appleftsidedrawer-children-body'>
                    {children}
                </div>
                ):(
                    <>
                        <div id='appleftsidedrawer-body-header'>
                            {bodyHeaderItems&&bodyHeaderItems.map((item,index)=>(
                                <div key={index} id='appleftsidebardrawer-body-header-item'>
                                    {item.component}
                                </div>
                            ))}
                        </div>
                        <div id='appleftsidebardrawer-body-wrapper'>
                            <div id='appleftsidebardrawer-body-items-wrapper'>
                                <ul id='appleftsidebardrawer-body-list'>
                                    {bodyItemsList&&bodyItemsList.map((item,index)=>(
                                        <li key={index} id='appleftsidebardrawer-body-list-item'>
                                            {item.component}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
            )}


            </div>
        </div>):null)}
        </>
    )
}

export default AppLeftSidebarDrawer