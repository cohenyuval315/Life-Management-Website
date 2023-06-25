
import * as React from "react";
import DataRow from "./DataRow";


export default function DataTree({isEdit, treeData, selectedItem ,handleSetSelectedItem , parentId = "0", level = 0 ,isChangable,handleRemoveOnClick,handleAddOnClick }) {

  const items = treeData.filter((item) =>{ 
        return item.parentId === parentId
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  if (!items.length) return null;
  return (
    <>
      {items.map((item) => (
        <DataRow isEdit={isEdit} item={item}  key={item.id} level={level} selectedItem={selectedItem} handleSetSelectedItem={handleSetSelectedItem} isChangable={isChangable} handleRemoveOnClick={handleRemoveOnClick} handleAddOnClick={handleAddOnClick}>
          <DataTree isEdit={isEdit} treeData={treeData} parentId={item.id} level={level + 1} selectedItem={selectedItem} handleSetSelectedItem={handleSetSelectedItem}  isChangable={isChangable} handleRemoveOnClick={handleRemoveOnClick} handleAddOnClick={handleAddOnClick}/>
        </DataRow>
      ))}
    </>
  );
}

