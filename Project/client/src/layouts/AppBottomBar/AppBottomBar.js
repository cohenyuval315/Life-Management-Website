import React,{useState} from 'react'
import './AppBottomBar.css'
import useKeyPress from '../../hooks/useKeyPress'

const AppBottomBar = ({items,children}) => {
    const bottomBarItems = []

    const [isOpen,setIsOpen] = useState(false)

    const onKeyPress = (event) => {
        setIsOpen(!isOpen)
    };

    useKeyPress(["b"],onKeyPress)

  return (
    <>{isOpen ? (
        <div id='appbottombar-container'>
            <div id='appbottombar-items-flexbox'>
                {items?items.map((item,index)=>(
                    <div key={index} id='appbottombar-flexbox-item'>
                        {item}
                    </div>
                )):(<div>{children}</div>)}

            </div>
        </div>
        ) : null}
    </>
  )
}

export default AppBottomBar