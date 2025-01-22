import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import GradingIcon from "@mui/icons-material/Grading";
import { useDispatch, useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { remove } from "../reduxStore/UserSlice";

export default function SideNav({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.cart);

  const routes = [
    { path: "active-members", logo: <ContactEmergencyIcon />, isAdmin: true },

    { path: "Inactive-Members", logo: <GradingIcon />, isAdmin: true },
    { path: "Trainers", logo: <ContactEmergencyIcon />, isAdmin: true },
    { path: "employees", logo: <SwitchAccountIcon />, isAdmin: true },
    { path: "Membership-Plans", logo: <GroupIcon />, isAdmin: true },
    { path: "gym-profile", logo: <AccountBoxIcon />, isAdmin: true },
  ];
  return (
    <>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ minHeight: "86vh" }}
      >
        <div>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              textTransform: "capitalize",
              fontSize: "16px",
              color: `${location.pathname == "/" ? "blue" : "black"}`,
            }}
          >
            <Box
              sx={{
                mx: 1,
                my: 0.5,
                p: 1,
                boxShadow: "0px 8px 18px rgba(158, 149, 149, 0.3)",
                borderRadius: "8px",
                color: `${location.pathname == "/" ? "white" : "black"}`,
              }}
              backgroundColor={`${
                location.pathname == "/" ? "#47478C" : "#eaeaf7"
              }`}
            >
              <WidgetsIcon />
              <Box
                component={"span"}
                sx={{ display: `${isOpen && "none"}`, mx: 1 }}
              >
                DASHBOARD
              </Box>
            </Box>
          </Link>
          {routes.map((data, index) => {
            // if (user.isAdmin == true || (user.isAdmin == false && data.isAdmin))
            return (
              <div key={index} className="menu-items">
                <Link
                  to={data?.path}
                  style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                    fontSize: "15px",
                    color: `${
                      location.pathname.slice(1) == data.path ? "blue" : "black"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      mx: 1,
                      my: 0.5,
                      p: 1,
                      boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.3)",
                      borderRadius: "8px",
                      // color: "black",
                      color: `${
                        location.pathname.slice(1) == data.path
                          ? "white"
                          : "balck"
                      }`,
                      // backgroundColor: "#47478C",
                      backgroundColor: `${
                        location.pathname.slice(1) == data.path
                          ? "#47478C"
                          : "#eaeaf7"
                      }`,
                    }}
                    index={index}
                  >
                    <span> {data?.logo}</span>
                    <Box
                      component={"span"}
                      sx={{ display: `${isOpen && "none"}`, mx: 1, my: 1 }}
                    >
                      {data?.path.toUpperCase()}
                    </Box>
                  </Box>
                </Link>
              </div>
            );
          })}
        </div>
        <div
          onClick={async () => {
            navigate("/login");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(remove());
          }}
          className="logout-btn"
        >
          <Box
            sx={{
              mx: 1,
              my: 0.5,
              p: 1,
              boxShadow: "0px 8px 18px rgba(158, 149, 149, 0.3)",
            }}
          >
            <LogoutIcon />
            <Box
              component={"span"}
              sx={{ display: `${isOpen && "none"}`, mx: 1 }}
            >
              Logout
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
