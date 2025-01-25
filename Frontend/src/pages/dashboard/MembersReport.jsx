import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import toast from "react-hot-toast";
import axiosInstance from "../../ApiManager";
import noResult from "../../../images/no-results3.jpeg";
import ContainerPage from "../HelperPages/ContainerPage";
import { useSelector } from "react-redux";
import { formatDateToDisplay } from "../../assets/FrontendCommonFunctions";

export default function MembersReport() {
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();

  const data = location?.state?.type;
  // console.log(type, "type is ");

  const title = data == "joined" ? "Joined Members" : "Expired Members";

  const totalPages = Math.ceil(totalCount / rowSize);

  const fetchData = async () => {
    // console.log("it calleddd");
    setLoading(true);
    let type = data;
    const res = await axiosInstance.get("/api/gym/member-report", {
      params: { search, rowSize, currentPage, type },
    });
    if (res.status == 200) {
      setAllMembers(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllMembers([]);
      setTotalCount(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, rowSize, currentPage]);

  return (
    <Box>
      <ContainerPage
        showBackBtn="true"
        title={title}
        showSearch={true}
        setSearch={setSearch}
        rowSize={rowSize}
        setRowSize={setRowSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      >
        <TableContainer
          className="scrollable-container"
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
                <TableCell sx={{ color: "white" }}>Member Name</TableCell>
                <TableCell sx={{ color: "white" }}>Phone</TableCell>
                <TableCell sx={{ color: "white" }}>Address</TableCell>
                <TableCell sx={{ color: "white" }}>Joining Date</TableCell>
                <TableCell sx={{ color: "white" }}>Plan Starts</TableCell>
                <TableCell sx={{ color: "white" }}>Membership Plan</TableCell>
                <TableCell sx={{ color: "white" }}>Next Bill Date</TableCell>
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
              ) : allMembers.length > 0 ? (
                allMembers?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {(currentPage - 1) * rowSize + index + 1}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.phone_number}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.address}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row.PlanRenew && formatDateToDisplay(row?.PlanRenew)}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row.doj && formatDateToDisplay(row?.doj)}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.memberPlan} Months
                    </TableCell>

                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row.ValidTill && formatDateToDisplay(row?.ValidTill)}
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
      </ContainerPage>
    </Box>
  );
}
