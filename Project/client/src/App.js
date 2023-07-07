import './App.css'
import React, {Suspense,useEffect,lazy} from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/index";
import UserProvider from "./context/UserProvider";
import ApiProvider from './context/ApiProvider'
import FlashProvider from "./context/FlashProvider";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingComponent from './routes/LoadingComponent'
import "./styles/styles.css";
import '@toast-ui/calendar/toastui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';
import {WorkerBuilder} from './worker/worker-builder';
import Worker from './worker/fibo.worker';


const AppWorker = () => {
  const instance = new WorkerBuilder(Worker);
    useEffect(() => {
      instance.onmessage = (message) => {
        if (message) {
          console.log("Message from worker", message.data);
        }
      };
    }, []);
  return (
    <button onClick={() => instance.postMessage(5)}>
      Send Message
    </button>
  )
}

const App = () => {
    return (
      <>
        <Suspense fallback={<LoadingComponent loading />}>
          <Router>
              <ApiProvider>
              <UserProvider>
              <FlashProvider>
              <ThemeProvider>
                    <AppRoutes/>
              </ThemeProvider>
              </FlashProvider>
              </UserProvider>
              </ApiProvider>
          </Router>
        </Suspense>
      </>
    );
}


export default App











// async function login() {
//   await fetch('/login_with_cookies', {method: 'post'});
// }

// async function logout() {
//   await fetch('/logout_with_cookies', {method: 'post'});
// }

// async function makeRequestWithJWT() {
//   const options = {
//     method: 'post',
//     credentials: 'same-origin',
//     headers: {
//       'X-CSRF-TOKEN': getCookie('csrf_access_token'),
//     },
//   };
//   const response = await fetch('/protected', options);
//   const result = await response.json();
//   return result;
// }

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }
