// import React,{useState,useEffect} from 'react'
// import './HomePageHeader.css'
// import ProgressBar from '../../../components/ui/ProgressBar/index'
// import { Link } from 'react-router-dom'
// // import { HomeIcon,MonetizationOnIcon} from '../../../assets/icons/index'
// import Tooltip from '../../../components/ui/Tooltip/index'

// const headerData = [
// {
//     id:133,
//     name:"home",
//     path:"/home",
//     // icon:<HomeIcon/>
// },

// {
//     id:1334,
//     name:"test",
//     path:"",
//     // icon:<HomeIcon/>
// },

// ]



// const HomePageHeader = () => {
//   const [completed, setCompleted] = useState(0);
//     const [coins, setCoins] = useState(10);

//   useEffect(() => {
//     setInterval(() => setCompleted(10, 100))
//   }, []);

//   return (
//     <div className='homepage-header-container'>  
//         {/* <div className='space'>
//         </div> */}
//         <div className='homepage-header-items'>
//             <div className='homepage-header-items-container'>
//                 <ul className='homepage-header-item-list'>
//                     <li className='homepage-header-progress-li'>
//                         <div className='homepage-header-progress-item'>
//                             <ProgressBar bgcolor={"#00a39b"} completed={completed} label={"lvl 3"}/>    
//                         </div>  
//                     </li>
//                     <li className='homepage-header-currency-li'>
//                         <div className='homepage-header-currency'>   
//                             <div className='homepage-header-currency-icon'>
//                             {/* <MonetizationOnIcon/>  */}
//                             </div>
//                             <div className='homepage-header-currency-label'>
//                                 {coins}
//                             </div>                   
//                         </div>
//                     </li>
//                     <div  className='homepage-header-links-options'>
//                         {headerData.map((itemData)=>{
//                             return (
//                                 <li key={itemData.id} className='homepage-header-links-options-li'>
//                                     <Link to={itemData.path} >      
//                                         <div className="homepage-header-link-option-item">
//                                             {/* <Tooltip text={itemData.name}>
//                                                 {itemData.icon}
//                                             </Tooltip> */}
//                                         </div>
//                                     </Link>
//                                 </li>)
//                         })}
//                     </div>
//                     <li className='homepage-header-menu-li' >
//                         <div className='homepage-header-menu-item'>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </div>  

//     </div>
//   )
// }

// export default HomePageHeader