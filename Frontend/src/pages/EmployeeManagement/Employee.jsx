import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import toast from "react-hot-toast";
import axiosInstance from "../../ApiManager";
import noResult from "../../../images/no-results3.jpeg";
import ContainerPage from "../HelperPages/ContainerPage";
import { useSelector } from "react-redux";

export default function Employee() {
  const [allemployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / rowSize);
  const user = useSelector((state) => state.cart);

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/employee", {
      params: { search, rowSize, currentPage, _id: user.id },
    });
    if (res.status == 200) {
      setAllEmployee(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllEmployee([]);
      setTotalCount(0);
    }
    setLoading(false);
  };

  const handleEdit = (id) => {
    navigate("/add-new-employee", { state: { id } });
  };

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/api/employee/${id}`);
    if (res.status == 200) {
      toast.success(res.data.message);
      setAllEmployee(allemployee.filter((data) => data._id != id));
    }
  };

  const onBtnClick = () => {
    navigate("/add-new-employee");
  };

  useEffect(() => {
    fetchData();
  }, [search, rowSize, currentPage]);

  return (
    <Box>
      <ContainerPage
        // showBackBtn={true}
        title={"Employees "}
        btnTitle={"Add Employee"}
        showSearch={true}
        setSearch={setSearch}
        rowSize={rowSize}
        setRowSize={setRowSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onBtnClick={onBtnClick}
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
                <TableCell sx={{ color: "white" }}>Employee Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Phone</TableCell>
                <TableCell sx={{ color: "white" }}>Department</TableCell>
                <TableCell sx={{ color: "white" }}>Address</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
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
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {(currentPage - 1) * rowSize + index + 1}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empName}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empEmail}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empPhone}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empDepartment}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empAddress}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      <div>
                        <button
                          type="button"
                          style={{
                            color: "#47478c",
                            cursor: "pointer",
                            border: "1px solid white",
                            marginLeft: "2px",
                          }}
                          onClick={() => handleEdit(row._id)}
                        >
                          <BorderColorIcon />
                        </button>

                        <button
                          style={{
                            color: "#47478c",
                            cursor: "pointer",
                            border: "1px solid white",
                            marginLeft: "2px",
                          }}
                          type="button"
                          onClick={() => handleDelete(row._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
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
