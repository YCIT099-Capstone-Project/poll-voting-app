import React from "react";
import { IconButton } from "@mui/material";
import { FormsLogo } from "../../../assets/img";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import "./FormHeader.css";
import logo from "../../images/Pollite.jpeg";
import TestDrawer from "../TestDrawer";

const FormHeader = () => {
  return (
    <div className="header">
      <div className="header_left">
        <TestDrawer />
        <div className="logo_container">
          <img
            src={FormsLogo}
            alt="FormsLogo"
            style={{
              width: "40px",
              height: "40px",
            }}
            className="forms_logo"
          />
          <img
            src={logo}
            alt="logo"
            style={{
              width: "95px",
              height: "40px",
            }}
            className="forms_logo"
          />
        </div>
      </div>
      <div className="header_search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" name="search" placeholder="search" />
      </div>
      <div className="header_right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" />
        </IconButton>
      </div>
    </div>
  );
};

export default FormHeader;
