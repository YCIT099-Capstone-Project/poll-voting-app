// Header.jsx

import React from "react";
import logo from "./images/Pollite.jpeg";

import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/forms">Login</Link>
          </li>
          <li>
            <a href="#">Signup</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
