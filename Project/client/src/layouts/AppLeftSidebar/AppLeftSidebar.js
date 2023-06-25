import React,{useState} from 'react'
import "./AppLeftSidebar.css"
import {Link} from 'react-router-dom'
import { SIDEBAR_DATA } from '../../resources/data'


const AppLeftSidebar = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div id="appleftsidebar-container">
      <div id='appleftsidebar-vertical-flexbox'>
        {SIDEBAR_DATA.map((itemData, index) => (
            <Link to={itemData.path} key={index}>
              <div id={itemData.id === activeItem ? "appleftsidebar-flexbox-item-active" : "appleftsidebar-flexbox-item"}  onClick={() => setActiveItem(itemData.id)}>
                {itemData.icon}   
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};
export default AppLeftSidebar


// function NavList() {
//   // This styling will be applied to a <NavLink> when the
//   // route that it links to is currently selected.
//   let activeStyle = {
//     textDecoration: "underline",
//   };

//   let activeClassName = "underline";

//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink
//             to="messages"
//             style={({ isActive }) =>
//               isActive ? activeStyle : undefined
//             }
//           >
//             Messages
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="tasks"
//             className={({ isActive }) =>
//               isActive ? activeClassName : undefined
//             }
//           >
//             Tasks
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="tasks">
//             {({ isActive }) => (
//               <span
//                 className={
//                   isActive ? activeClassName : undefined
//                 }
//               >
//                 Tasks
//               </span>
//             )}
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }

