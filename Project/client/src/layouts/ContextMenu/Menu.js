import React, { useRef } from "react";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "./ContextMenu";

export const TARGET_ONE_ITEMS = [
  { label: "Charge an invoice", value: "chargeAnInvoice" },
  { label: "Search", value: "search" }
];

export const TARGET_TWO_ITEMS = [
  { label: "New Message", value: "newMessage" },
  { label: "Mark Pending", value: "markPending" }
];


const MultiTriggerExample = () => {
  const menu = useRef(null);
  const targetOneRef = useRef(null);
  const targetTwoRef = useRef(null);

  const { targetOne, targetTwo , x, y } = useContextMenu({
    menu,
    targets: [
      { id: "targetOne", target: targetOneRef },
      { id: "targetTwo", target: targetTwoRef }
    ]
  });

    const styles = {
        container : {
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        underline : {
            textDecoration: "underline",
            fontStyle: "italic",
        }

    }

  return (
    <div style={{...styles.container}}>

      <div ref={targetOneRef}>
            target1
      </div>
      {targetOne.isOpen && <ContextMenu ref={menu} x={x} y={y} items={TARGET_ONE_ITEMS} />}

      <div ref={targetTwoRef}>
            target2 
      </div>
      {targetTwo.isOpen && <ContextMenu ref={menu} x={x} y={y} items={TARGET_TWO_ITEMS} />}
    </div>
  );
};

export default MultiTriggerExample;
