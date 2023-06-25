import { isArray } from "./helpers";


export function toAdjacencyListMap(data,key,arrKey){
    if(!isArray(data)){
        return
    }
    let adjacencyList = new Map()
    for (let item of data){
        let vertice = item[key] // []
        adjacencyList.set(vertice,[])

    }
    for (let item of data){
        let vertice = item[key] // []
        adjacencyList.set(vertice,[])
        let edges = item[arrKey]// [parents]
        for (let edge of edges){
            adjacencyList.get(vertice).push(edge)
        }
        
    }
    return adjacencyList
}

export function adjacencyListMapToEdges(adjacencyList){
    let edgeList = []
    Array.from( adjacencyList ).map(([key, value]) => {
        if(value.length === 0){
            edgeList.push([key,'-1'])
        }else
        {
            [...value].map((item)=>{
                if(key !== item){
                    edgeList.push([key,item])
                }
                return item
            })
        }
        return value
    })
    return edgeList
}

export function edgesToAdjacencyListMap(edges,isUndirected=false){
    let adjacencyList = new Map()
    for (let edge of edges){
        adjacencyList.set(edge[0],[])
        adjacencyList.set(edge[1],[])
    }
    for (let edge of edges){
        adjacencyList.get(edge[0]).push(edge[1]);
        if(isUndirected === true){
            adjacencyList.get(edge[1]).push(edge[0]);
        }
    }
    return adjacencyList
}

export function reverseEdges(edges){
    let cloneEdges = edges
    let newEdges = []
    for (let index = 0; index < edges.length; index++) {
        let edge = cloneEdges[index]
        newEdges.push([edge[1],edge[0]])
    }
    return newEdges
}

export function isCyclic(adjacencyListMap)
{
    // Mark all the vertices as not visited and
        // not part of recursion stack
        let length = adjacencyListMap.keys().size
        console.log("length")
        let visited = new Array(length);
        let recStack = new Array(length);

        for(let i=0;i<length;i++)
        {
            visited[i]=false;
            recStack[i]=false;
        }
         
          
        // Call the recursive helper function to
        // detect cycle in different DFS trees
        for (let i = 0; i < length; i++)
            if (isCyclicUtil(i, visited, recStack,adjacencyListMap))
                return true;
  
        return false;
}

function isCyclicUtil(i,visited,recStack,adj)
{
    // Mark the current node as visited and
        // part of recursion stack
        if (recStack[i])
            return true;
  
        if (visited[i])
            return false;
              
        visited[i] = true;
  
        recStack[i] = true;
        let children = [...adj.values()][i];
          
        for (let c=0;c< children.length;c++)
            if (isCyclicUtil(children, visited, recStack,adj))
                return true;
                  
        recStack[i] = false;
  
        return false;
}

function topologicalSortUtil(v, visited, stack, adj)
{
    console.log("reached here3")
    visited[v] = true;
    let i = 0;
    console.log("t0",adj)
    console.log("t1",adj.get(v))
    console.log("t2",adj[v])


    for(i = 0 ; i < adj[v].length ; i++){
        if(!visited[adj.get(v)[i]]){
            topologicalSortUtil(adj.get(v)[i], visited, stack)
        }
    }
    console.log("reached here3.5")
    // Push current vertex to stack
    // which stores result
    stack.push(v);
}

export function topologicalSort(adjacencyListMap)
{
    const length = [...adjacencyListMap.keys()].length
    console.log("SIZE LENGTH ",length)
    let stack = new Array()
    
    let visited = new Array(length);
    for (let i = 0 ; i < length ; i++){
        visited[i] = false;
    }
    console.log("reached here2")
    for (let i = 0 ; i < length ; i++){
        if (visited[i] == false){
            topologicalSortUtil(i, visited, stack,adjacencyListMap);
            console.log("reached here4")
        }
    }

    // Print contents of stack
    while (stack.length != 0){
        console.log(stack.pop() + " ")
    }
}

export function tsort(edges) {
  var nodes   = {}, // hash: stringified id of the node => { id: id, afters: lisf of ids }
      sorted  = [], // sorted list of IDs ( returned value )
      visited = {}; // hash: id of already visited node => true

  var Node = function(id) {
    this.id = id;
    this.afters = [];
  }

  // 1. build data structures
  edges.forEach(function(v) {
    var from = v[0], to = v[1];
    if (!nodes[from]) nodes[from] = new Node(from);
    if (!nodes[to]) nodes[to]     = new Node(to);
    nodes[from].afters.push(to);
  });

  // 2. topological sort
  Object.keys(nodes).forEach(function visit(idstr, ancestors) {
    var node = nodes[idstr],
        id   = node.id;

    // if already exists, do nothing
    if (visited[idstr]) return;

    if (!Array.isArray(ancestors)) ancestors = [];

    ancestors.push(id);

    visited[idstr] = true;

    node.afters.forEach(function(afterID) {
      if (ancestors.indexOf(afterID) >= 0)  // if already in ancestors, a closed chain exists.
        throw new Error('closed chain : ' +  afterID + ' is in ' + id);

      visit(afterID.toString(), ancestors.map(function(v) { return v })); // recursive call
    });

    sorted.unshift({id:id, level:ancestors.length});
  });

  return sorted;
}
// export class Graph{
//     constructor(isDirected=true)
//     {
//         this.noOfVertices = 0
//         this.AdjList = new Map()
//         this.isDirected = isDirected
//     }
//     addVertex(v){
//         this.AdjList.set(v, []);
//         this.noOfVertices = this.noOfVertices + 1
//     }
//     addEdge(v, w)
//     {
//         // get the list for vertex v and put the
//         // vertex w denoting edge between v and w
//         this.AdjList.get(v).push(w);
    
//         // Since graph is undirected,
//         // add an edge from w to v also
//         if(this.isDirected === true){
//             this.AdjList.get(w).push(v);
//         }
//     }
//     printGraph()
//     {
//         // get all the vertices
//         var get_keys = this.AdjList.keys();
    
//         // iterate over the vertices
//         for (var i of get_keys)
//     {
//             // great the corresponding adjacency list
//             // for the vertex
//             var get_values = this.AdjList.get(i);
//             var conc = "";
    
//             // iterate over the adjacency list
//             // concatenate the values into a string
//             for (var j of get_values)
//                 conc += j + " ";
    
//             // print the vertex and its adjacency list
//             console.log(i + " -> " + conc);
//         }
//     }
    
//     bfs(startingNode)
//     {
    
//         // create a visited object
//         var visited = {};
    
//         // Create an object for queue
//         var q = [];
        
    
//         // add the starting node to the queue
//         visited[startingNode] = true;
//         q.enqueue(startingNode);
    
//         // loop until queue is empty
//         while (!(q.length > 0)) {
//             // get the element from the queue
//             var getQueueElement = q.shift();
    
//             // passing the current vertex to callback function
//             console.log(getQueueElement);
    
//             // get the adjacent list for current vertex
//             var get_List = this.AdjList.get(getQueueElement);
    
//             // loop through the list and add the element to the
//             // queue if it is not processed yet
//             for (var i in get_List) {
//                 var neigh = get_List[i];
    
//                 if (!visited[neigh]) {
//                     visited[neigh] = true;
//                     q.enqueue(neigh);
//                 }
//             }
//         }
//     }
//     dfs(startingNode)
//     {
    
//         var visited = {};
    
//         this.DFSUtil(startingNode, visited);
//     }
    
//     // Recursive function which process and explore
//     // all the adjacent vertex of the vertex with which it is called
//     DFSUtil(vert, visited)
//     {
//         visited[vert] = true;
//         console.log(vert);
    
//         var get_neighbours = this.AdjList.get(vert);
    
//         for (var i in get_neighbours) {
//             var get_elem = get_neighbours[i];
//             if (!visited[get_elem])
//                 this.DFSUtil(get_elem, visited);
//         }
//     }

// }

