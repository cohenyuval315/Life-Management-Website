import React,{useEffect,useState} from 'react';
import { DUMMY } from './dummyData';
import Branch from './Branch';

const Tree = ({ data }) => {
	const [selectedItem,setSelectedItem] = useState(null)

	const handleSelectedItemOnChange = (e) => {
		setSelectedItem(e)
	}

	useEffect(() => {
	  console.log(selectedItem)
	  return () => {
		
	  }
	}, [handleSelectedItemOnChange])

	return (
		<div>
			{data.map((item) => <Branch key={item.id} item={item} level={0} selectedItem={selectedItem} onSelect={handleSelectedItemOnChange}/>)}
		</div>
	);
}

export {DUMMY} 

export default Tree;

