import { TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function ContainerPage({
  children,
  showBackBtn = false,
  title,
  btnTitle,
  setSearch,
  showSearch = false,
  rowSize,
  setRowSize,
  totalPages,
  currentPage,
  setCurrentPage,
  onBtnClick,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container-fluid position-sticky top-0  container-header">
        <div className="row">
          <div className="col-md-4 ">
            {showBackBtn && (
              <button
                style={{ border: "0px", color: "black" }}
                onClick={() => navigate(-1)}
              >
                <KeyboardBackspaceIcon
                  sx={{ fontSize: "30px" }}
                ></KeyboardBackspaceIcon>
              </button>
            )}
            <span
              className="mx-3"
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#47478C",
              }}
            >
              {title}
            </span>
          </div>
          <div className="col-md-8 d-flex justify-content-end">
            {showSearch && (
              <TextField
                type="text"
                sx={{ width: "200px", mt: 1 }}
                size="small"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="search"
              ></TextField>
            )}
            {btnTitle && (
              <button className="common-btn" onClick={() => onBtnClick()}>
                {btnTitle}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <div
          className="d-flex flex-column justify-content-between mt-2 "
          style={{ height: "83vh" }}
        >
          {children}
          {rowSize && (
            <Pagination
              setRowSize={setRowSize}
              rowSize={rowSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            ></Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
