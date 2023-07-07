// require('file-loader?name=[name].[ext]!../public/index.html')
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import './index.css'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
reportWebVitals();