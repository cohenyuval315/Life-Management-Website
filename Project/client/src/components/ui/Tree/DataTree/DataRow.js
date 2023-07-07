import classnames from "classnames";
import {Icons} from "../../../../assets";

import React,{ useState } from "react";
import './DataRow.css';
import StyledButton from "../../Button/StyledButton";


export default function DataRow({isEdit,item, level, children ,selectedItem,handleSetSelectedItem,handleRemoveOnClick,handleAddOnClick }) {

  const [isCollapsed, setIsCollapsed] = useState(true);

    function handleCollapseOnClick(){
        setIsCollapsed(!isCollapsed);
        handleSetSelectedItem(item);
    }

  return (
    <div key={`section-${item.id}`}>


        <div className="rowContainer">
        <div className={classnames("row", `level-${level}`)} onClick={handleCollapseOnClick}>

            {!item.hasChildren ? null : (

                // <ChevronRightIcon className={classnames("chevron", {"rotated": !isCollapsed})}/>
                <Icons.ChevronRight className={classnames("chevron", {"rotated": !isCollapsed})}/>
            )}
            
            {item.hasChildren ?( isCollapsed ? (
                <Icons.Folder className={"folder"}/>
                ) : (
                <Icons.FolderOpen className={"folderOpen"} />
                )
            ) : (
                <Icons.Description className={"file"} />
            )}

            <span style={(selectedItem&&selectedItem.id===item.id)?{color:"red"}:{color:"white"}}>{item.name}</span>
        </div>

            {(isEdit===true)&&(
            <div className={"buttons"}>
                <StyledButton name={"add"} handleOnClick={()=>handleAddOnClick(item.id)}/>
                <StyledButton name={"remove"} handleOnClick={()=>handleRemoveOnClick(item.id)}/>

            </div>
            )}

        </div>

      <div
        className={classnames("children", {"collapsed": isCollapsed,})}>
        {children}
      </div>

    </div>
  );
}
