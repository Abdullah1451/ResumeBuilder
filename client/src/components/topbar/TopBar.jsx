import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/default.png";
// import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("vikiresume-user"))
  }, [])

  const handleLogout = () => {
    localStorage.setItem("vikiresume-user", "")
    setUser("")
  };
  return (
    <div className="top">
      <div className="topLeft">
        <Link to="/">
          <img src={logo} alt="logo" className="img2" />
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link  to="/settings">
            <img className="topImg" src={"#"} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
