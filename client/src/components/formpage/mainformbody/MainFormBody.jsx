import React from "react";
import { ArrowDropDown, More } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Storage } from "@mui/icons-material";
import { FolderOpen } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./MainFormBody.css";

const MainFormBody = () => {
  return (
    <div className="main_body">
      <div className="mainbody_top">
        <div
          className="mainbody_top_left"
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Recent Forms
        </div>
        <div className="mainbody_top_right">
          <div
            className="mainbody_top_center"
            style={{
              fontSize: "14px",
              marginRight: "125px",
            }}
          >
            Owned by Anyone <ArrowDropDown />
          </div>
          <IconButton>
            <Storage
              style={{
                fontSize: "16px",
                color: "black",
              }}
            />
          </IconButton>
          <IconButton>
            <FolderOpen
              style={{
                fontSize: "16px",
                color: "black",
              }}
            />
          </IconButton>
        </div>
      </div>
      <div className="mainbody_docs">
        <div className="doc_card">
          <img
            src="https://images.ctfassets.net/lzny33ho1g45/1vWnEBZDXN5vfqdTPo8F1K/15eddd18711b135a251ebd2bdfe3e59e/Google_Forms_Fields"
            alt=""
            className="doc_img"
          />
          <div className="doc_card_content">
            <h5>Political Party Form</h5>
            <div
              className="doc_content"
              style={{
                fontSize: "12px",
                color: "gray",
              }}
            >
              <div className="content_left">
                <Storage
                  style={{
                    color: "white",
                    fontSize: "12px",
                    backgroundColor: "#6e2594",
                    padding: "3px",
                    marginRight: "3px",
                    borderRadius: "2px",
                  }}
                />{" "}
                Opened Jul 8, 2023
              </div>
              <MoreVertIcon
                style={{
                  fontSize: "12px",
                  color: "gray",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFormBody;
