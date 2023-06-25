importScripts('https://unpkg.com/d3@5.12.0/dist/d3.min.js');

function runLayout(graph) {

    const { nodes, links } = graph;

    d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-25))
        .force('center', d3.forceCenter())
        .stop()
        .tick(300);

    const positions = Object.fromEntries(nodes.map(node => {
        return [node.id, { x: node.x, y: node.y }];
    }));
    console.log("reached end of run layout")
    return positions;
}

onmessage = (event) => {
    console.log("worker")
    const graph = event.data[0];
    console.log("graph in worker =", graph)
    const result = runLayout(graph);
    postMessage(result);
}
