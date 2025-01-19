import React, { useState } from "react";
import ContainerPage from "./HelperPages/ContainerPage";
import { useLocation } from "react-router-dom";
const dp_image = "../../images/user.jpg";

export default function MemberDetailsPage() {
  const location = useLocation();
  const { data } = location.state;

  return (
    <>
      <ContainerPage title={"Member Details"} showBackBtn="true">
        {false ? (
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
                  src={data?.profilePic || dp_image}
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
                    <span className="fw-bold">Phone Number :</span>{" "}
                    {data?.phone_number}{" "}
                  </li>
                  <li>
                    <span className="fw-bold">Address :</span> {data?.address}{" "}
                  </li>
                  <li>
                    <span className="fw-bold">Date of Joining :</span>{" "}
                    {data?.doj || "--"}{" "}
                  </li>

                  <li>
                    <span className="fw-bold">Membership Plan :</span>{" "}
                    {data?.memberPlan || "--"}{" "}
                  </li>
                  <li>
                    <span className="fw-bold">Next Bill Date :</span>{" "}
                    {data?.ValidTill || "--"}{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </ContainerPage>
    </>
  );
}
