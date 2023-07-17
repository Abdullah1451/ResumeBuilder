import React from "react";
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../assets/default.png";
import { useUserContext } from '../../contexts/UserContext';

import style from './topbar.module.css'


const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const { user, logout, setSignup } = useUserContext();


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
          {showNavbar ? <CloseIcon /> : <MenuIcon />}
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
            {user?.loginStatus ?
              <>
                <li>
                  <span className={style.login} onClick={logout}>Log Out</span>
                </li>
              </> :
              <>
                <li>
                  <NavLink className={style.login} onClick={() => { setSignup(false) }} to="/login">Log In</NavLink>
                </li>
                <li>
                  <NavLink className={`${!showNavbar && style.signup} ${showNavbar && style.login} `} onClick={() => { setSignup(true) }} to="/login">Sign Up</NavLink>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;