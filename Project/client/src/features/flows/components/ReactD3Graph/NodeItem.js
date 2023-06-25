import React from 'react'
import {NodeWithExtraParameters} from 'react-d3-graph'

const onClickNode = function(nodeId) {
    window.alert('Clicked node', nodeId);
};

const onRightClickNode = function(nodeId) {
    window.alert('Right clicked node', nodeId);
}

const onMouseOverNode = function(nodeId) {
    window.alert('Mouse over node', nodeId);
};

const onMouseOutNode = function(nodeId) {
    window.alert('Mouse out node', nodeId);
};

const generateCustomNode = (node) => {
    return <CustomComponent node={node} />;
}

const NodeItem = () => {
  return (
    <div>
      <NodeWithExtraParameters
          id='nodeId'
          cx=22
          cy=22
          fill='green'
          fontSize=10
          fontColor='black'
          fontWeight='normal'
          dx=90
          label='label text'
          labelPosition='top'
          opacity=1
          renderLabel=true
          size=200
          stroke='none'
          strokeWidth=1.5
          svg='assets/my-svg.svg'
          type='square'
          viewGenerator={generateCustomNode}
          className='node'
          onClickNode={onClickNode}
          onRightClickNode={onRightClickNode}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode} />
    </div>
  )
}

export default NodeItem