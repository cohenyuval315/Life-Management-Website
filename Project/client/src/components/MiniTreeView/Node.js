import React,{useEffect} from 'react';
import { Icons} from '../../assets/index.js';

const Node = ({ item, hasChildren, level, onToggle ,selected, onSelect}) => {
	
	const styles = {
		nodeItemContainer : {
			paddingLeft: `${level * 16}px`
			
		},
		nodeItemFlex : {
			display: 'flex',
		},
		nodeItemListIconWrapper:{
			fontSize:"8px",
			paddingRight:"5px",
		},
		nodeItemListIcon : {
			// background: "none",
			// color: "inherit",
			// border: "none",
			// padding: "0",
			// font: "inherit",
			// cursor: "pointer",
			// outline: "inherit",
		},
		nodeItemWrapper : {
			display: "flex",
		},
		nodeItemLabel : {
			
		},
		nodeItemIcon : {
			
		},
		nodeItemIcon : {
			
		},
	}

	function handleClick(){
		onToggle()
		onSelect(item.label)
	}


	

	return (
		<div style={{...styles.nodeItemContainer}} onClick={handleClick}>
			<div style={{...styles.nodeItemFlex}} >
				<div style={{...styles.nodeItemListIconWrapper}} >
					{hasChildren && <div style={{...styles.nodeItemListIcon}}>{selected?Icons.ChevronDown:Icons.ChevronRight}</div>}
				</div>
				<div style={{...styles.nodeItemWrapper}}>
					<div style={{...styles.nodeItemIcon}}>
						{item.icon}
					</div>
					<div style={{...styles.nodeItemLabel}}>	
						{item.label}
					</div>

				</div>
			</div>
		</div>
	);
};

export default Node;