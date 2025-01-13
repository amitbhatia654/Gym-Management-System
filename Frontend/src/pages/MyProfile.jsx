import { Button } from "@mui/material";
import img from "../../images/user.jpg";
import { useNavigate } from "react-router-dom";
import ContainerPage from "./HelperPages/ContainerPage";
import axiosInstance from "../ApiManager";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MyProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.cart);
  const id = user.id || "";

  const getEmpById = async () => {
    setLoading(true);
    const result = await axiosInstance.get(`/api/update-profile/${id}`);
    setLoading(false);
    if (result) {
      setData(result.data);
    } else {
      setData({});
    }
  };

  useEffect(() => {
    if (id) getEmpById();
  }, []);
  return (
    <>
      <ContainerPage title={"My Profile"}>
        {loading ? (
          <>
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ height: "100vh" }}
            >
              <div className="loader"></div>
            </div>
          </>
        ) : (
          <div
            className="container mt-4 p-4  "
            // style={{ boxShadow: " inset 0px 1px 3px grey", height: "50vh" }}
          >
            <div className="row">
              {/* <div className="col-md-1"></div> */}
              <div className="col-md-3 px-4">
                <img
                  src={data?.profilePic || img}
                  alt=""
                  height={"230px"}
                  width={"250px"}
                  style={{
                    borderRadius: "50%",
                    boxShadow: " 2px 1px 10px grey",
                  }}
                />
              </div>
              <div
                className="col-md-8 my-2 "
                // style={{ boxShadow: " 2px 1px 10px grey" }}
              >
                <ul className="list-unstyled fs-5 py-2">
                  <li>
                    {" "}
                    <span className="fw-bold">Name :</span> {data?.name}{" "}
                  </li>
                  <li>
                    <span className="fw-bold">Email :</span> {data?.email}{" "}
                  </li>
                  <li>
                    <span className="fw-bold">Phone Number :</span>{" "}
                    {data?.phone}{" "}
                  </li>
                  <li>
                    <span className="fw-bold">Department :</span>{" "}
                    {data?.department || "--"}{" "}
                  </li>

                  <li>
                    <span className="fw-bold">Address :</span>{" "}
                    {data?.address || "--"}{" "}
                  </li>
                  <li>
                    <Button
                      sx={{
                        my: 1,
                        color: "#47478c",
                        backgroundColor: "white",
                        fontSize: "13px",
                      }}
                      onClick={() =>
                        navigate("/update-profile", { state: { id: "123" } })
                      }
                    >
                      Edit
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </ContainerPage>
    </>
  );
};

export default MyProfile;
