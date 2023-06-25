
import React,{useState} from 'react'
import './CollapsableList.css'

const CollapsableList = ({data,componentItemName,keyName,component:Item, ...props}) => {
  const [state,setState]  = useState({activeCollapse: ''})

  function handleExpandCollaps(name){
    if (state.activeCollapse === name) {
        setState({ activeCollapse: '' })
    } else {
        setState({ activeCollapse: name })
    }
  }

  function moreInfoClick(e,name){
    e.stopPropagation();
    // setState({ activeCollapse: name })
    // console.log("clicked");
  }

  return (
      <div>
        <div className="sidebar-nav">
          <div className="sidebar-nav-menu">
            {(data?.map((item)=>{
                  const newProps = {
                        ...props
                  }
                    newProps[`${componentItemName}`] = item

                    {/* {React.cloneElement(children, {handleClose:handleClose})} */}
              // console.log(state.activeCollapse === item[`${keyName}`])
              return (
                <div key={item[`${keyName}`]} className={`sidebar-nav-menu-item ${state.activeCollapse === item[`${keyName}`] ? 'item-active' : ''}`} onClick={() => handleExpandCollaps(item[`${keyName}`])} data-id={item[`${keyName}`]}  >
                  <div className="sidebar-nav-menu-item-head">
                    <span className="sidebar-nav-menu-item-head-title">{item[`${keyName}`]}</span>
                    <span className="sidebar-nav-menu-item-head-help">
                      {/* <button type="button" className="btn-help" onClick={(e)=>moreInfoClick(e,item[`${keyName}`])}>View more info</button> */}
                    </span>
                  </div>
                  <div className="sidebar-nav-menu-item-body">
                      <Item {...newProps} />
                  </div>
                </div>
              )
            }))}

          </div>
        </div>
      </div>
  );
  
}
export default CollapsableList