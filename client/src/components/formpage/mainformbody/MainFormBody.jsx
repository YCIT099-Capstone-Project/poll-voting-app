import React, { useEffect, useState } from "react";
import { ArrowDropDown, More } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Storage } from "@mui/icons-material";
import { FolderOpen } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import moment from "moment";
import "./MainFormBody.css";
import { selectUser } from "../../../redux/features/userSlice";

const MainFormBody = () => {
  const [polls, setPolls] = useState([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:4000/getPolls/${user.id}`)
        .then((response) => response.json())
        .then((data) => setPolls(data))
        .catch((err) => console.log(err));
    }
  }, [user]);
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
        {polls.map((poll) => (
          <div className="doc_card" key={poll.id}>
            <img
              src="https://images.ctfassets.net/lzny33ho1g45/1vWnEBZDXN5vfqdTPo8F1K/15eddd18711b135a251ebd2bdfe3e59e/Google_Forms_Fields"
              alt=""
              className="doc_img"
            />
            <div className="doc_card_content">
              <h5>{poll.title}</h5>
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
                  />
                  created {moment(poll.start_date).format("MMM D, YYYY")}
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
        ))}
      </div>
    </div>
  );
};

export default MainFormBody;
