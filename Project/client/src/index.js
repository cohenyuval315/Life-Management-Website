// require('file-loader?name=[name].[ext]!../public/index.html')
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import './index.css'
import * as serviceWorker from './serviceWorker';



// const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


// ReactDOM.render(
//     <ThemeProvider theme={Theme}>
//         <Router>
//             <Routes />
//         </Router>
//     </ThemeProvider>,
//     document.getElementById('root')
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();