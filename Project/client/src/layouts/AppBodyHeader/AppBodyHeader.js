import React from 'react'
import './AppBodyHeader.css'
import { Link } from 'react-router-dom';

const AppBodyHeader = (props) => {
    const leftSideHeaderItems = props.leftHeaderItems || []
    const rightSideHeaderItems = props.rightHeaderItems || []
    const middleSideHeaderItem = props.title || "no title"

  return (
        <div id='appbodycontent-header'>
            <div id='appbodycontent-header-horizontal-flexbox'>
                <div id='appbodycontent-header-horizontal-flexbox-left'>
                    <div  id='appbodycontent-header-horizontal-flexbox-left-flexbox'>
                        {leftSideHeaderItems.map((item,index)=>(
                           <Link key={index} to={item.path}>
                                {item.text}
                                <div  id='appbodycontent-header-horizontal-flexbox-left-flexbox-item'>
                                    {item.component}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div id='appbodycontent-header-horizontal-flexbox-middle'>
                    <div id='appbodycontent-header-horizontal-flexbox-middle-container'>
                        <div id='appbodycontent-header-horizontal-flexbox-middle-item'>
                             {middleSideHeaderItem}
                        </div>
                    </div>
                </div>
                <div id='appbodycontent-header-horizontal-flexbox-right'>
                    <div id='appbodycontent-header-horizontal-flexbox-right-flexbox'>
                        {rightSideHeaderItems.map((item,index)=>(
                            <Link to={item.path} key={index}>
                                {item.text}
                                <div id='appbodycontent-header-horizontal-flexbox-right-flexbox-item'>
                                    {item.component}
                                </div>
                            </Link> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AppBodyHeader