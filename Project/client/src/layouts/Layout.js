import React,{useEffect,useRef} from "react";
import AppLeftSidebar from './AppLeftSidebar/index'
import './Layout.css'
import { Outlet } from 'react-router-dom';


const Layout = () => {

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
    
  return (
        <div id="main-layout" >
            <AppLeftSidebar/>
            
            <Outlet/>
        </div>
  );
};
export default Layout



