import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ContainerPage from "../HelperPages/ContainerPage";
import { formatDateToDisplay } from "../../assets/FrontendCommonFunctions";
import axiosInstance from "../../ApiManager";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const dp_image = "/images/user.jpg";
import noResult from "../../../images/no-results3.jpeg";

export default function TrainersDetailsPage() {
  const location = useLocation();
  const [allemployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = location.state;

  console.log(data, "data is ");

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get(`/api/gym/getMemberList/:${data._id}`, {
      params: { trainerId: data._id },
    });
    if (res.status == 200) {
      setAllEmployee(res.data.response);
      // setTotalCount(res.data.totalCount);
    } else {
      setAllEmployee([]);
      // setTotalCount(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <h4 className="text-center text-secondary mt-5">
              Members Allocated to this Trainer
            </h4>

            <TableContainer
              className="scrollable-container mt-4"
              style={{ maxHeight: "62vh" }}
            >
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "#47478c",
                    color: "wheat",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <TableRow className="tableStyle">
                    <TableCell sx={{ color: "white" }}>S.No.</TableCell>
                    <TableCell sx={{ color: "white" }}>Employee Name</TableCell>
                    <TableCell sx={{ color: "white" }}>gender</TableCell>
                    <TableCell sx={{ color: "white" }}>Phone</TableCell>
                    <TableCell sx={{ color: "white" }}>address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBodyStyle">
                  {loading ? (
                    <TableCell colSpan={8}>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "300px",
                          textAlign: "center",
                        }}
                      >
                        <div className="loader"></div>
                      </div>
                    </TableCell>
                  ) : allemployee.length > 0 ? (
                    allemployee?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)",
                          }}
                        >
                          {/* {(currentPage - 1) * rowSize + index + 1} */}
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{
                            boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)",
                          }}
                        >
                          {row?.name}
                        </TableCell>
                        <TableCell
                          style={{
                            boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)",
                          }}
                        >
                          {row?.gender}
                        </TableCell>
                        <TableCell
                          style={{
                            boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)",
                          }}
                        >
                          {row?.phone_number}
                        </TableCell>

                        <TableCell
                          style={{
                            boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)",
                          }}
                        >
                          {row?.address}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "300px",
                            textAlign: "center",
                          }}
                        >
                          <img
                            src={noResult}
                            alt="No Result Image"
                            height="250px"
                            width="300px"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </ContainerPage>
    </>
  );
}
