import React, { useState ,useEffect,useRef} from 'react'
import { Icons} from '../../assets/index.js'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import './SortableMasterList.css'

const makeForest = (id, xs) => 
  xs .filter (({parent}) => parent == id)
     .map (({id, parent, ...rest}) => ({id, ...rest, children: makeForest (id, xs)}))





const treeData = [
    {
        id:"1",
        label:"item1",
        children:[
            {           
                id:"2",
                label:"item2",
                children:[
                    {           
                        id:"3",
                        label:"item3",
                        children:[
                            {           
                                id:"4",
                                label:"item4",
                                children:[
                                    {           
                                        id:"8",
                                        label:"item8",
                                        children:[
                                            {           
                                                id:"9",
                                                label:"item9",
                                                children:[
                                                        {           
                                                            id:"10",
                                                            label:"item10",
                                                            children:[
                                                            ],
                                                        },
                                                ],
                                            },
                                        ],
                                    },


                                ],
                            },
                            {           
                                id:"5",
                                label:"item5",
                                children:[
                                ],
                            },
                        ],
                    },
                ],
            },
            {            
                id:"6",
                label:"item6",
                children:[
                ],
            }
        ],
    },
    {
        id:"73",
        label:"item537",
        children:[
        ],
    },
    {
        id:"17",
        label:"item427",
        children:[
        ],
    },
    {
        id:"117",
        label:"item37",
        children:[
        ],
    },
    {
        id:"1117",
        label:"item11117",
        children:[
        ],
    },
    {
        id:"11317",
        label:"item11117",
        children:[
        ],
    }


]


// const SortableMasterList = ({data}) => {
//     const {scrollRef}  = useHorizontalScroll()
//     const newdata = [
//         {
//             id:"1",
//             text:"item1",
//             children:["hello,hello"],
//         },
//         {
//             id:"2",
//             text:"item2",
//             children:["hello,hello","hello,hello"],
//         },
//         {
//             id:"3",
//             text:"item3",
//             children:["hello5,he6llo","hello4,hello2"],
//         },
//         {
//             id:"4",
//             text:"item4",
//             children:["hello53"],
//         },
//         {
//             id:"5",
//             text:"item5",
//             children:[
//                 "hello53"
//                         ],
//         },
//         {
//             id:"6",
//             text:"item6",
//             children:[
//                 "hello53"
//                 ],
//         },
//         {
//             id:"7",
//             text:"item7",
//             children:[
//                 "hello53"
//                 ],
//         },
//         {
//             id:"8",
//             text:"item8",
//             children:["ye"],
//         }
//     ]

//   return (
//     <div className='master-list-container'>
//         <div className='master-list-content-container'>
//             <div className='master-list-content' ref={scrollRef}>
//                 {data?data:newdata.map((item)=>{ return (
//                     <div className='master-list-content-item'> 
//                         <div className='master-list-content-item-header'>
//                             <div className='master-list-content-left-item-header-icon'>
//                                 {AtomIcon}
//                             </div>
//                             <div className='master-list-content-right-item-header-icon'>
//                                 {AtomIcon}
//                             </div>
//                         </div>
//                         <div className='master-list-content-item-body'>
//                             <div className='master-list-content-item-body-content'>
//                                 <div className='master-list-content-item-body-content-list-wrapper'>
//                                     {item.children.map((child)=>{return (

//                                         <div className='master-list-content-item-body-content-list-item'>
//                                             <div className='master-list-content-item-body-content-list-item-wrapper'>
//                                                 <div className='master-list-content-item-body-content-list-item-row'>
//                                                     <div className='master-list-content-item-body-content-list-item-content'>
//                                                         <div className='master-list-content-item-body-content-list-item-content-left'>
//                                                             <div className='master-list-content-item-body-content-list-item-content-left-icon'>
//                                                                 {AtomIcon}
//                                                             </div>
//                                                             <div className='master-list-content-item-body-content-list-item-content-left-text'>
//                                                                 <span className='master-list-content-item-body-content-list-item-content-left-text-span'>     
//                                                                     {child}
//                                                                 </span>
//                                                             </div>
//                                                     </div>
//                                                         <div className='master-list-content-item-body-content-list-item-content-right'>
//                                                             <span className='master-list-content-item-body-content-list-item-content-right-text-span'>
//                                                             </span>
//                                                         </div>
//                                                         <div className='master-list-content-item-body-content-list-item-hover-options'>
//                                                             <div className='master-list-content-item-body-content-list-item-hover-option-icon'>
//                                                                 {AtomIcon}
//                                                             </div>
//                                                             <div className='master-list-content-item-body-content-list-item-hover-option-icon'>
//                                                                 {AtomIcon}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                     )})}



//                                 </div>
//                             </div>
//                             <div className='master-list-content-item-body-footer'>      
//                                 <div className='master-list-content-item-body-footer-content'>
//                                     {AtomIcon}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )})}
//             </div>
//         </div>
//         <div className='master-list-left-content-header'>
//             <div className='master-list-left-content-header-item'>
//                 all
//             </div>
//         </div>
//         <div className='master-list-right-content-header'>
//             <div className='master-list-right-content-header-item'>
//                 <div className='master-list-right-content-header-item-icon'>
//                     {AtomIcon}
//                 </div>
//                 <div className='master-list-right-content-header-item-footer'>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }




const SortableMasterListTree = ({data}) => {

    const horizontalScrollRef = useHorizontalScroll()
  return (
    <div className='master-list-container'>
        <div className='master-list-content-container'>
            <div className='master-list-content' ref={horizontalScrollRef} >

                <SortableMasterListBranch data={data?data:treeData} level={0}/>

            </div>
        </div>
        <div className='master-list-left-content-header'>
            <div className='master-list-left-content-header-item'>
                all
            </div>
        </div>
        <div className='master-list-right-content-header'>
            <div className='master-list-right-content-header-item'>
                <div className='master-list-right-content-header-item-icon'>
                    {Icons.Atom}
                </div>
                <div className='master-list-right-content-header-item-footer'>
                </div>
            </div>
        </div>
    </div>
  )
}


const SortableMasterListBranch = ({data,level}) => {

    const [selected,setSelected] = useState(null)

	const handleSetSelected = (e) => {
        if (selected === null){
            setSelected(e)
            return
        }
        if(e.id === selected.id){
            setSelected({id:''})
        }else{
            setSelected(e);
        }
		
	};

    useEffect(() => {
	  return () => {
		
	  }
	}, [handleSetSelected])


	const renderChildren = () => {
        const arr =  data.filter((item)=>item.id === selected.id)
        const item = arr.length === 1 ? arr[0] : null
		if (item && item.children && item.children.length !== 0) {
			const newLevel = level + 1;
			return <SortableMasterListBranch level={newLevel} data={item.children} />
		}
		return null;
	};



	// const styles = {	

    //     // color: selectedItem  === item.label ?  "#bfbfbf": "#bfbfbf",
    //     background: isHover ? "#00a39b" : selectedItem  === item.label ? "#202126" :"#16171b",
    //     // color: isHover ?  "#bfbfbf": "#bfbfbf",
	// }


  return (<>
                    <div className='master-list-content-item'> 
                        <div className='master-list-content-item-header'>
                            <div className='master-list-content-left-item-header-icon'>
                                {Icons.Atom}
                            </div>
                            <div className='master-list-content-right-item-header-icon'>
                                {Icons.Atom}
                            </div>
                        </div>
                        <div className='master-list-content-item-body'>

                            <div className='master-list-content-item-body-content'>
                                <div className={'master-list-content-item-body-content-list-wrapper'}>
                                    {data.map((item)=>{return (
                                        <SortableMasterListNode
                                            key={item.id}
                                            item={item}
                                            onSelect={handleSetSelected}
                                            selectedItem={selected}
                                        />
                                    )})}

                                   
                                </div>
                            </div>

                            <div className='master-list-content-item-body-footer'>      
                                <div className='master-list-content-item-body-footer-content'>
                                    {Icons.Atom}
                                </div>
                            </div>
                        </div>
                    </div>
                    {selected && renderChildren()}                    
    </>
  )
}


const SortableMasterListNode = ({item,selectedItem,onSelect}) => {

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


    function handleClick(){
        onSelect(item)
	}

  return (
        <div className={['master-list-content-item-body-content-list-item',selectedItem ? selectedItem.id === item.id ?"selected-item":"" : ""].join(' ')} onClick={handleClick} >
            <div className='master-list-content-item-body-content-list-item-wrapper'>
                <div className='master-list-content-item-body-content-list-item-row'>
                    <div className='master-list-content-item-body-content-list-item-content'>
                        <div className='master-list-content-item-body-content-list-item-content-left'>
                            <div className='master-list-content-item-body-content-list-item-content-left-icon'>
                                {Icons.Atom}
                            </div>
                            <div className='master-list-content-item-body-content-list-item-content-left-text'>
                                <span className='master-list-content-item-body-content-list-item-content-left-text-span'>     
                                    {item.label}
                                </span>
                            </div>
                    </div>
                        <div className='master-list-content-item-body-content-list-item-content-right'>
                            <span className='master-list-content-item-body-content-list-item-content-right-text-span'>
                            </span>
                        </div>
                        <div className='master-list-content-item-body-content-list-item-hover-options'>
                            <div className='master-list-content-item-body-content-list-item-hover-option-icon'>
                                {Icons.Atom}
                            </div>
                            <div className='master-list-content-item-body-content-list-item-hover-option-icon'>
                                {Icons.Atom}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}


export default SortableMasterListTree