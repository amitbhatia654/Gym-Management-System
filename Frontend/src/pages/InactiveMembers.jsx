import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "./HelperPages/Modal";
import { Formik, ErrorMessage, Form } from "formik";
import axiosInstance from "../ApiManager";
const dp_image = "../../images/user.jpg";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import toast from "react-hot-toast";
import { addMember } from "../assets/FormSchema";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "./HelperPages/Pagination";
import { useNavigate } from "react-router-dom";
import { formatDateToInput } from "../assets/FrontendCommonFunctions";
// import { formatDateToInput } from "../../../Backend/utils/CommonFunctions";

export default function InactiveMembers() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [editMember, setEditMember] = useState({});
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [allMembers, setAllMembers] = useState([]);
  const totalPages = Math.ceil(totalCount / rowSize);
  const navigate = useNavigate();
  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = async (values) => {
    // return console.log(values, "form values");
    setloading(true);
    if (values?.profilePic?.name) {
      const base64 = await convertFileToBase64(values?.profilePic);
      var data = { ...values, profilePic: base64 };
    } else data = { ...values };

    const res = editMember._id
      ? await axiosInstance.put(`/api/gym/member`, data)
      : await axiosInstance.post(`/api/gym/member`, data);

    setloading(false);
    if (res.status == 200) {
      if (editMember._id) {
        const updatedMember = allMembers.map((folder) => {
          if (folder._id == values._id) {
            return res.data.result;
          }

          return folder;
        });

        setAllMembers(updatedMember);
      }
      if (allMembers.length < rowSize) allMembers.push(res.data.result);
      toast.success(res.data.message);
      setEditMember({});
      // setShowModal(false);
    }
  };

  const deleteMember = async (memberId) => {
    // console.log(memberId);
    const res = await axiosInstance.delete(`/api/gym/member`, {
      data: { memberId },
    });
    if (res.status == 200) {
      toast.success(res.data.message);

      const updatedMembers = allMembers.filter(
        (member) => member._id !== memberId
      );
      setAllMembers(updatedMembers);
    } else toast.error(res.data.message);
  };

  const fetchData = async () => {
    setloading(true);
    const type = "inactive";

    const res = await axiosInstance.get("/api/gym/member", {
      params: { search, rowSize, currentPage, type },
    });
    if (res.status == 200) {
      setAllMembers(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllEmployee([]);
      setTotalCount(0);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, rowSize, currentPage]);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <span
            className="mx-2"
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#47478C",
            }}
          >
            Inactive Members
          </span>
        </div>
        <div>
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
        </div>
      </div>
      <div className="container">
        <div
          className="scrollable-container"
          style={{ minHeight: "74vh", maxHeight: "74vh" }}
        >
          <div className="d-flex flex-wrap mt-1">
            {allMembers.length > 0
              ? allMembers.map((member, id) => {
                  return (
                    <div className=" member-box text-center " key={id}>
                      <div
                        onClick={() =>
                          navigate("/member-details", {
                            state: { data: member },
                          })
                        }
                        className="member"
                      >
                        <img
                          src={member.profilePic ? member.profilePic : dp_image}
                          alt=""
                          className="member-image"
                        />

                        <div className="fw-bold mt-2"> {member.name}</div>
                        <div>+91 {member?.phone_number}</div>
                      </div>
                      <span>
                        Valid Till :
                        <span className="text-danger">
                          {" "}
                          {member?.ValidTill ?? "--"}{" "}
                        </span>
                        <span className="dropdown">
                          <button
                            className="btn "
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <h6>
                              <MoreVertIcon sx={{ fontSize: "19px" }} />
                            </h6>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setEditMember(member), setShowModal(true);
                                }}
                              >
                                Renew Plan
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => deleteMember(member._id)}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </span>
                      </span>
                    </div>
                  );
                })
              : "No Member Added Yet"}
          </div>
        </div>
      </div>

      <Pagination
        setRowSize={setRowSize}
        rowSize={rowSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      ></Pagination>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          //   otherFunc={setEditMember}
          title={`Renew Members Plan `}
          handleSubmit={handleSubmit}
        >
          <Formik
            initialValues={
              editMember._id
                ? editMember
                : {
                    name: "",
                    address: "",
                    phone_number: "",
                    doj: "",
                    memberPlan: "",
                    profilePic: "",
                  }
            }
            // validationSchema={addMember}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <div className=" ">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="container">
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Name"
                                value={props.values.name}
                                disabled
                                name="name"
                                onChange={props.handleChange}
                              />

                              <ErrorMessage
                                name="name"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="phone-number">Phone Number</label>
                              <input
                                type="number"
                                className="form-control"
                                id="phone-number"
                                placeholder="Enter Phone Number"
                                value={props.values.phone_number}
                                name="phone_number"
                                // onChange={props.handleChange}
                                onChange={(e) => {
                                  if (e.target.value.length < 11)
                                    props.setFieldValue(
                                      "phone_number",
                                      e.target.value
                                    );
                                }}
                              />
                            </div>
                            <ErrorMessage
                              name="phone_number"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Enter Address"
                                value={props.values.address}
                                name="address"
                                onChange={props.handleChange}
                              />
                            </div>
                            <ErrorMessage
                              name="address"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="joining-date">Joining Date</label>
                              <input
                                type="date"
                                className="form-control"
                                disabled
                                id="joining-date"
                                name="doj"
                                value={props.values.doj}
                                onChange={(e) => {
                                  props.setFieldValue("doj", e.target.value);
                                }}
                              />
                            </div>
                            <ErrorMessage
                              name="doj"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              {console.log(props.values, "props")}
                              <label htmlFor="ValidTill">Due Date</label>
                              <input
                                type="date"
                                className="form-control"
                                disabled
                                id="ValidTill"
                                name="ValidTill"
                                value={
                                  props.values.ValidTill
                                    ? formatDateToInput(props.values.ValidTill)
                                    : ""
                                }
                              />
                            </div>

                            <div className="form-group mt-2">
                              <label htmlFor="renewalDate">Renewal Date</label>

                              <input
                                type="date"
                                className="form-control"
                                id="renewalDate"
                                name="renewalDate"
                                // value={props.values.}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "renewalDate",
                                    e.target.value
                                  );
                                }}
                              />
                            </div>

                            <div className="form-group mt-2">
                              <label htmlFor="membership">
                                Membership Plan
                              </label>
                              <select
                                className="form-control"
                                id="membership"
                                name="memberPlan"
                                value={props.values.memberPlan} // Ensure it's `value`, not `values`
                                onChange={(e) =>
                                  props.setFieldValue(
                                    "memberPlan",
                                    e.target.value
                                  )
                                } // Update state
                              >
                                <option value={1}>1 Month</option>
                                <option value={2}>2 Month</option>
                                <option value={3}>3 Month</option>
                                <option value={6}>6 Month</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="pic">Profile Pic</label>
                              <br />

                              <img
                                src={props.values?.profilePic}
                                alt=""
                                className="pic-form"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center my-5">
                        <Button
                          variant="outlined"
                          type="submit"
                          sx={{
                            my: 1,
                            color: "#47478c",
                            backgroundColor: "white",
                            fontSize: "16px",
                          }}
                          disabled={loading}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  );
}
