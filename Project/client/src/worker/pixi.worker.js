// // eslint-disable-next-line import/no-anonymous-default-export
// export default () => {
//  // eslint-disable-next-line no-restricted-globals
//     self.onmessage = e => {
//         const message = e.data;
//         console.log(`[From Main]: ${message}`);
//         postMessage("Polo!");
//     };
// };
import React, { useRef, useEffect } from "react";

import { Application } from "pixi.js";

onmessage = function(event) {
    startPixi(event.ref);
    postMessage("success");
};


function startPixi(ref){

    const app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x5BBA6F,
    });


    // Add app to DOM
    ref.current.appendChild(app.view);

    // Start the PixiJS app
    app.start();

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
}