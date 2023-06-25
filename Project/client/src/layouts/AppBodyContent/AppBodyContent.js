import React from 'react'
import './AppBodyContent.css'
import { Link } from 'react-router-dom';
import AppRightSidebarDrawer from '../AppRightSidebarDrawer/index';


const AppBodyContent = ({leftHeaderItems,title,rightHeaderItems,children}) => {
  return (
    <div id='appbodycontent-container'>
        <div id='appbodycontent-header'>
            <div id='appbodycontent-header-horizontal-flexbox'>
                <div id='appbodycontent-header-horizontal-flexbox-left'>
                    <div  id='appbodycontent-header-horizontal-flexbox-left-flexbox'>
                        {leftHeaderItems&&leftHeaderItems.map((item,index)=>(
                            
                           item.path?(<Link key={`${item.path}_left_header`} to={item.path}>
                                <div  id='appbodycontent-header-horizontal-flexbox-left-flexbox-item'>
                                    {item.component}
                                </div>
                            </Link>):
                                <div key={`${index}_left_header`}  id='appbodycontent-header-horizontal-flexbox-left-flexbox-item'>
                                    {item.component}
                                </div>
                        ))}
                    </div>
                </div>
                <div id='appbodycontent-header-horizontal-flexbox-middle'>
                    <div id='appbodycontent-header-horizontal-flexbox-middle-container'>
                        <div id='appbodycontent-header-horizontal-flexbox-middle-item'>
                             {title&&title}
                        </div>
                    </div>
                </div>
                <div id='appbodycontent-header-horizontal-flexbox-right'>
                    <div id='appbodycontent-header-horizontal-flexbox-right-flexbox'>
                        {rightHeaderItems&&rightHeaderItems.map((item,index)=>(
                            item.path?(<Link to={item.path} key={`${item.path}_right_header`}>
                                <div id='appbodycontent-header-horizontal-flexbox-right-flexbox-item'>
                                    {item.component}
                                </div>
                            </Link> ):
                                <div  key={`${index}_right_header`} id='appbodycontent-header-horizontal-flexbox-right-flexbox-item'>
                                    {item.component}
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div id='#appbodycontent-body-vertical-flexbox'>
            <div id='appbodycontent-body-vertical-flexbox-horizontal-flexbox'>
                <div id='appbodycontent-body-content-wrapper'>
                    <div id='appbodycontent-body-content-wrapper'>
                            {children&&children}
                    </div>
                </div>
                <AppRightSidebarDrawer/>
            </div>
        </div>
    </div>
  )
}

export default AppBodyContent