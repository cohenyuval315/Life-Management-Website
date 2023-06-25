import React,{useEffect,useRef} from "react";
import { createPortal } from "react-dom";
import './GraphLayout.css'
import useOutsideClick from "../../hooks/useOutsideClick";
import useEscapeKey from "../../hooks/useEscapeKey";
import { Icons } from "../../assets/index.js";


export const GraphModal = ({handleGraph,title,children}) => {
  function close() {
    handleGraph(false);
  }
  return (
      <>
        <div id="graph-container">
          <div id='graph-items-container'>
            <div id="graph-header" >
                {title}
            </div>
            <div id="graph-body">
                {children}
            </div>
          </div>
        </div>
        <button id="graph-close-button" onClick={close}>
            {Icons.Xmark}
        </button>
      </>
  )
}



function GraphLayout(props) {
  const graphRoot = document.getElementById('graph-root')
  // if(!document.getElementById("graph-content") ) {
  //   const graphElement = document.createElement('div')
  //   graphElement.setAttribute("id", "graph-content");
  //   graphRoot.appendChild(graphElement)
  // }

  return (
    createPortal(
      <>
       <GraphModal {...props}/>
      </>,
     graphRoot
    )
  );
}

export default GraphLayout