import * as d3 from 'd3'

export function runD3Layout(graph,width,height){
      const {nodes,links} = graph
        console.log("pre",nodes)
      const simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links) // This force provides links between nodes
          .id((d) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
          .distance(300))
          .force("charge", d3.forceManyBody().strength(-100)) // This adds repulsion (if it's negative) between nodes.
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("collision", d3.forceCollide().radius((d) => d.radius).iterations(2))
          .velocityDecay(0.8);
      const positions = Object.fromEntries(nodes.map(node => {return [node.id,{x: node.x, y: node.y}]}))
      return {positions,simulation}
}


export const color = (function() {
    let scale = d3.scaleOrdinal(d3.schemeCategory10);
    return (num) => parseInt(scale(num).slice(1), 16);
})();