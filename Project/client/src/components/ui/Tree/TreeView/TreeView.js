import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeNode from "./TreeNode";

const mockApiCall = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nextId = Math.ceil(Math.random() * 100);
      resolve([
        {
          id: `${nextId}`,
          name: `child-${nextId}`,
          children: []
        },
        {
          id: `${nextId + 1}`,
          name: `child-${nextId + 1}`,
          children: []
        }
      ]);
    }, Math.ceil(Math.random() * 1000));
  });
};

const makeApiCall = mockApiCall;

const TreeView = (props) => {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState("1");
  const [tree, setTree] = React.useState(
    new TreeNode({
      id: "1",
      name: "src",
      children: []
    })
  );
  const handleChange = async (event, nodeId) => {
    const node = tree.search(nodeId);
    if (node && !node.children.length) {
      makeApiCall()
        .then((result) => {
          setTree(tree.addChildren(result, nodeId));
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setSelected(nodeId);
          setExpanded([...expanded, nodeId]);
        });
    }
  };
  const createItemsFromTree = (fromTree) => {
    if (fromTree.children.length) {
      return (
        <TreeItem key={fromTree.id} nodeId={fromTree.id} label={fromTree.name}>
          {fromTree.children.length > 0 &&
            fromTree.children.map((child) => createItemsFromTree(child))}
        </TreeItem>
      );
    }
    return (
      <TreeItem key={fromTree.id} nodeId={fromTree.id} label={fromTree.name} />
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selected}
      onNodeSelect={handleChange}
      expanded={expanded}
    >
      {createItemsFromTree(tree)}
    </TreeView>
  );
};

export default TreeView;