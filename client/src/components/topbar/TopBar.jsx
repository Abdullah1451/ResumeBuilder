import React from "react";
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import logo from "../../assets/default.png";
import style from './topbar.module.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <div className={style.logo}>
          {/* <Brand /> */}
          <img src={logo} alt="logo" className={style.img2} />
        </div>
        <div className={style.menu_icon} onClick={handleShowNavbar}>
          {/* <Hamburger /> */}
          <div>-</div>
        </div>
        <div className={`${style.nav_elements}  ${showNavbar && style.active}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className={style.vertical_separator_li}>
              <div className={style.vertical_separator}></div>
            </li>
            <li>
              <NavLink className={style.login} to="/contact">Log In</NavLink>
            </li>
            <li>
              <NavLink className={`${!showNavbar && style.signup} ${showNavbar && style.login} `} to="/contact">Sign Up</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/default.png";
// // import { Context } from "../../context/Context";
// import "./topbar.css";

// export default function TopBar() {
//   const [user, setUser] = useState("");

//   useEffect(() => {
//     setUser(localStorage.getItem("vikiresume-user"))
//   }, [])

//   const handleLogout = () => {
//     localStorage.setItem("vikiresume-user", "")
//     setUser("")
//   };
//   return (
//     <div className="top">
//       <div className="topLeft">
//         <Link to="/">
//           <img src={logo} alt="logo" className="img2" />
//         </Link>
//       </div>
//       <div className="topCenter">
//         <ul className="topList">
//           <li className="topListItem">
//             <Link className="link" to="/">
//               HOME
//             </Link>
//           </li>
//           <li className="topListItem">
//             <Link className="link" to="/">
//               ABOUT
//             </Link>
//           </li>
//           <li className="topListItem">
//             <Link className="link" to="/">
//               CONTACT
//             </Link>
//           </li>
//           <li className="topListItem">
//             <Link className="link" to="/write">
//               WRITE
//             </Link>
//           </li>
//           <li className="topListItem" onClick={handleLogout}>
//             {user && "LOG OUT"}
//           </li>
//         </ul>
//       </div>
//       <div className="topRight">
//         {user ? (
//           <Link  to="/settings">
//             <img className="topImg" src={"#"} alt="" />
//           </Link>
//         ) : (
//           <ul className="topList">
//             <li className="topListItem">
//               <Link className="link" to="/login">
//                 LOG IN
//               </Link>
//             </li>
//             <li className="topListItem">
//               <Link className="link" to="/register">
//                 SIGN UP
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
