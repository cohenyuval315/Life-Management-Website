import React, { useState } from 'react';
import Node from './Node';

const Branch = ({ item, level , onSelect, selectedItem}) => {

	const [selected, setSelected] = useState(item.selected ?? false);
    const [isHover, setIsHover] = useState(false);


    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const ItemProps = {
        onMouseEnter:handleMouseEnter,
        onMouseLeave:handleMouseLeave,
    }

	const hasChildren = item.children && item.children.length !== 0;

	const renderBranches = () => {
		if (hasChildren) {
			const newLevel = level + 1;

			return item.children.map((child) => {
				return <Branch key={child.id} item={child} level={newLevel} onSelect={onSelect} selectedItem={selectedItem} />
			});
		}

		return null;
	};

	const toggleSelected = () => {
		setSelected(prev => !prev);
	};

	const styles = {	

        // color: selectedItem  === item.label ?  "#bfbfbf": "#bfbfbf",
        background: isHover ? "#00a39b" : selectedItem  === item.label ? "#202126" :"#16171b",
        // color: isHover ?  "#bfbfbf": "#bfbfbf",
	}

	return (
		<>
			<div style={{...styles}} {...ItemProps}>
			<Node
				item={item}
				selected={selected}
				hasChildren={hasChildren}
				level={level}
				onToggle={toggleSelected}
				onSelect = {onSelect}
			/>
			</div>
			{selected && renderBranches()}
		</>
	);
};

export default Branch;