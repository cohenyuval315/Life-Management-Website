import React, { forwardRef,useState} from "react";
import { Icons } from "../../assets/index.js";

const ContextMenu = forwardRef(({ items,x,y }, ref) => {

    const styles = {
            position: "fixed",
            border:" 2px solid #333333",
            background: "#202125",
            borderRadius: "4px",
            boxShadow:"0 0 4px 2px #33333370",
            padding: 0,
            paddingTop:"10px",
            paddingBottom:"10px",
            paddingLeft:"10px",
            paddingRight:"10px",
            margin: 0,
            fontSize:14,
            listStyleType:"none",      

            top:y,
            left:x,  
    }
        function click(label){
            alert(`${label} got no click action`)
        }

        return (
            <div  style={{...styles}} ref={ref}>
                {items.map(({icon, label, value , onItemClick }) => (
                    <ContextMenuItem label={label} value={value} icon={icon} onItemClick={onItemClick?onItemClick:()=>click(label)}/>
                ))}
            </div>
        )
})

const ContextMenuItem = ({icon, label,value, onItemClick}) => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const styles = {
        itemContainer: {
            padding: "8px",
            textAlign: "left",
            background: isHover ? "#00a39b" : "#202125",
            color: isHover ?  "#bfbfbf": "#bfbfbf",
            borderRadius:"5px"
        },
        itemFlex : {
            display:"flex"
        },
        itemIcon : {
            color:isHover ? "#bfbfbf": "#00a39b",
            paddingRight:"10px",
        },
        itemLabel: {

        }
    }

    const ItemProps = {
        onMouseEnter:handleMouseEnter,
        onMouseLeave:handleMouseLeave,
    }

    function handleClick(){
        onItemClick()
    }

  return (
    <li style={{...styles.itemContainer}} {...ItemProps}  key={value} onClick={()=>handleClick()}>
        <div style={{...styles.itemFlex}}>
            <div style={{...styles.itemIcon}}>
                {icon?icon:Icons.Atom}
            </div>
            <div style={{...styles.itemLabel}}>
                {label}
            </div>
        </div>
    </li>
  )
}

export default ContextMenu;
