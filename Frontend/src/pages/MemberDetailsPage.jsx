import React, { useState } from "react";
import ContainerPage from "./HelperPages/ContainerPage";
import { useLocation } from "react-router-dom";
import { formatDateToDisplay } from "../assets/FrontendCommonFunctions";
const dp_image = "/images/user.jpg";

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
          <div className="container mt-4 p-4  ">
            <div className="row">
              <div className="col-md-3 px-4">
                <img
                  src={data?.profilePic || dp_image}
                  alt=""
                  height={"280px"}
                  width={"280px"}
                  style={{
                    boxShadow: " 2px 1px 10px grey",
                  }}
                />
              </div>
              <div className="col-md-8 ">
                <table
                  style={{
                    width: "100%",
                  }}
                >
                  <tbody>
                    <tr
                      style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        fontWeight: "bold",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px",
                          // border: "1px solid white",
                          fontWeight: "bold",
                        }}
                      >
                        Name
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          color: "blue",
                        }}
                      >
                        {data?.name}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Phone Number
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.phone_number}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Address
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.address}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Date of Joining
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {formatDateToDisplay(data?.doj)}
                      </td>
                    </tr>
                    {console.log(data, "data")}
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Assigned Trainer
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.assigned_trainer.name}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Plan Renew
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {formatDateToDisplay(data?.lastPayment?.planRenew)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Membership Plan
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.lastPayment.memberPlan} Month
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Next Bill Date
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {formatDateToDisplay(data?.lastPayment.validTill)}
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
