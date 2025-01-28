import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import UpdateIcon from "@mui/icons-material/Update";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";
import FirstChats from "./FirstChats";
import { PieChart } from "@mui/x-charts";

export default function Main_dashBoard() {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return (
    <>
      <h4 className=" m-2" style={{ color: "darkblue" }}>
        {" "}
        DashBoard
      </h4>
      <div className="d-flex flex-wrap mt-4">
        <div
          className="detail-box d-flex justify-content-center align-items-center box1"
          onClick={() =>
            navigate("members-report", { state: { type: "joined" } })
          }
        >
          <div className="">
            <div className="text-center">
              <CalendarMonthIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2 ">
              Joined Members<br></br> in {month}
            </div>
          </div>
        </div>
        <div
          className="detail-box d-flex justify-content-center align-items-center box2 "
          onClick={() =>
            navigate("members-report", { state: { type: "expired" } })
          }
        >
          <div className="">
            <div className="text-center">
              <SupervisorAccountIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2">
              Expired Members <br></br> in {month}
            </div>
          </div>
        </div>

        <div
          className="detail-box d-flex justify-content-center align-items-center box3 "
          onClick={() =>
            navigate("members-report", { state: { type: "expireIn3" } })
          }
        >
          <div className="">
            <div className="text-center">
              <AvTimerIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2 ">Expiring Within 3 Days</div>
          </div>
        </div>

        <div
          className="detail-box d-flex justify-content-center align-items-center box4 "
          onClick={() =>
            navigate("members-report", { state: { type: "expireIn7" } })
          }
        >
          <div className="">
            <div className="text-center">
              <UpdateIcon sx={{ fontSize: "35px" }} />
            </div>
            <div className="mt-2 ">Expiring Within 7 Days</div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <FirstChats></FirstChats>
          </div>
          <div className="col-md-6 pt-3">
            <h6 className="" style={{ color: "" }}>
              Total Active & Inactive Members Ratio (Current year)
            </h6>
            <PieChart
              className="mt-4"
              series={[
                {
                  data: [
                    { id: 0, value: 75, label: "Active " },
                    { id: 1, value: 40, label: "Inactive " },
                    // { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={400}
              height={200}
              colors={['blue','red']}
            />
          </div>
        </div>
      </div>
    </>
  );
}
