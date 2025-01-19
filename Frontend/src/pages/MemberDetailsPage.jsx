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
                  height={"280px"}
                  width={"280px"}
                  style={{
                    // borderRadius: "50%",
                    boxShadow: " 2px 1px 10px grey",
                  }}
                />
              </div>
              <div
                className="col-md-8  "
                // style={{ boxShadow: " 2px 1px 5px grey" }}
              >
                {/* <table>
                  <tr>
                    <thead>Name </thead>
                    <td>{data?.name}</td>
                  </tr>
                  <tr>
                    <thead>Phone Number </thead>
                    <td>{data?.phone_number}</td>
                  </tr>
                  <tr>
                    <thead>Address </thead>
                    <td>{data?.address}</td>
                  </tr>
                  <tr>
                    <thead>Date of Joining </thead>
                    <td>{data?.doj}</td>
                  </tr>

                  <tr>
                    <thead>Membership Plan </thead>
                    <td>{data?.memberPlan}</td>
                  </tr>

                  <tr>
                    <thead>Next Bill Date </thead>
                    <td>{data?.ValidTill}</td>
                  </tr>
                </table> */}

                <table
                  style={{
                    width: "100%",
                    // borderCollapse: "collapse",
                    // border:"2px solid grey"
                    // margin: "20px 0",
                    // backgroundColor: "#f4f4f4",
                  }}
                  // style={{}}
                >
                  <thead></thead>
                  <tbody>
                    <tr
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        fontWeight: "bold",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          // border: "1px solid white",
                          fontWeight: "bold",
                        }}
                      >
                        Name
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd",color:"blue" }}>
                        {data?.name}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Phone Number
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {data?.phone_number}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Address
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {data?.address}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Date of Joining
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {data?.doj}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Membership Plan
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {data?.memberPlan} Month
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Next Bill Date
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {data?.ValidTill}
                      </td>
                    </tr>
                  </tbody>
                </table>

                
              </div>
            </div>
          </div>
        )}
      </ContainerPage>
    </>
  );
}
