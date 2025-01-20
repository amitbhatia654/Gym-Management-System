import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import UpdateIcon from "@mui/icons-material/Update";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

export default function Main_dashBoard() {
  const navigate = useNavigate();
  return (
    <>
      <h4 className=" m-2" style={{ color: "darkblue" }}>
        {" "}
        Members Details
      </h4>
      <div className="d-flex flex-wrap mt-2">
        <div
          className="detail-box d-flex justify-content-center align-items-center box1"
          onClick={() => navigate("members-report")}
        >
          <div className="">
            <div className="text-center">
              <CalendarMonthIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2 ">
              All Joined Member<br></br>Current Month
            </div>
          </div>
        </div>
        <div
          className="detail-box d-flex justify-content-center align-items-center box2 "
          onClick={() => navigate("members-report")}
        >
          <div className="">
            <div className="text-center">
              <SupervisorAccountIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2">
              All Expired Member <br></br>Current Month
            </div>
          </div>
        </div>

        <div
          className="detail-box d-flex justify-content-center align-items-center box3 "
          onClick={() => navigate("members-report")}
        >
          <div className="">
            <div className="text-center">
              <AvTimerIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2 ">Expired Within 3 Days</div>
          </div>
        </div>

        <div
          className="detail-box d-flex justify-content-center align-items-center box4 "
          onClick={() => navigate("members-report")}
        >
          <div className="">
            <div className="text-center">
              <UpdateIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2 ">Expired Within 7 Days</div>
          </div>
        </div>
      </div>
    </>
  );
}
