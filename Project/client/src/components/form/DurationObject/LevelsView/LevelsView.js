import React from 'react'
import './LevelsView.css'



const LevelsView = (props) => {
    const {data,component:Item} = props
    const levels = [...new Set ( [...data.map((i)=>i.level)] )]
    console.log("levels",levels,"data",data)
  return (
    <div>
        {(levels.map((level)=>{
            return (
            <div className={`level${level}`} style={{paddingLeft:`${level * 10}px`}}>
             level : {level}
                <div>
                    {(data.map((item)=>{
                        if(item.level === level){
                            if(item.id === '-1'){
                                return (<div>root</div>)
                            }else{
                                return(
                                <div style={{border:"1px", padding:"5px"}}>
                                    <Item item={item}/>
                                </div>)
                            }
                        }else return null
                    }

                    ))}
                </div>
            </div>)
        }))}

    </div>
  )
}

export default LevelsView