import React from "react";
import { useLocation } from "react-router-dom";
import ContainerPage from "../HelperPages/ContainerPage";
import { formatDateToDisplay } from "../../assets/FrontendCommonFunctions";
const dp_image = "/images/user.jpg";

export default function TrainersDetailsPage() {
  const location = useLocation();
  const { data } = location.state;

  return (
    <>
      <ContainerPage title={"Trainer Details"} showBackBtn="true">
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
              <div className="col-md-8  ">
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
                        Gender
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.gender}
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
                        Address{" "}
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
                        Emergency Number
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.emergency_number}
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

                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          fontWeight: "bold",
                        }}
                      >
                        Training Experience
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.training_exp} Year
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
                        Shift & Timings{" "}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.shift_timings} Month
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
                        Specialization{" "}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        {data?.specialization}
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
