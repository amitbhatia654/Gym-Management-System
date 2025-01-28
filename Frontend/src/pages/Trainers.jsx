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
const dp_image = "/user.jpg";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import toast from "react-hot-toast";
import { addMember } from "../assets/FormSchema";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "./HelperPages/Pagination";
import { useNavigate } from "react-router-dom";
import {
  formatDateToDisplay,
  formatDateToInput,
} from ".././assets/FrontendCommonFunctions";
import ConfirmModal from "./HelperPages/ConfirmModal";

export default function Trainers() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editMember, setEditMember] = useState({});
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [allTrainers, setAllTariners] = useState([]);
  const totalPages = Math.ceil(totalCount / rowSize);
  const [confirmModalData, setConfirmModalData] = useState({
    open: false,
    answer: "",
  });
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
    // return console.log(values, "form value1s");
    setSubmitLoading(true);
    if (values?.profilePic?.name) {
      const base64 = await convertFileToBase64(values?.profilePic);
      var data = { ...values, profilePic: base64 };
    } else data = { ...values };

    const res = editMember._id
      ? await axiosInstance.put(`/api/gym/trainer`, data)
      : await axiosInstance.post(`/api/gym/trainer`, data);

    setSubmitLoading(false);
    if (res.status == 200) {
      if (editMember._id) {
        const updatedTrainer = allTrainers.map((trainer) => {
          if (trainer._id == values._id) {
            return res.data.result;
          }
          return trainer;
        });
        setAllTariners(updatedTrainer);
      } else {
        if (allTrainers.length < rowSize) allTrainers.push(res.data.result);
      }
      toast.success(res.data.message);
      setEditMember({});
      setShowModal(false);
    }
  };

  const deleteMember = async (trainerId) => {
    const userResponse = await showConfirmationModal();
    if (userResponse != "yes") return;
    const res = await axiosInstance.delete(`/api/gym/trainer`, {
      data: { trainerId },
    });
    if (res.status == 200) {
      toast.success(res.data.message);

      const updatedMembers = allTrainers.filter(
        (member) => member._id !== trainerId
      );
      setAllTariners(updatedMembers);
    } else toast.error(res.data.message);
  };

  const fetchData = async () => {
    setloading(true);

    const res = await axiosInstance.get("/api/gym/trainer", {
      params: { search, rowSize, currentPage },
    });
    if (res.status == 200) {
      setAllTariners(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllTariners([]);
      setTotalCount(0);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, rowSize, currentPage]);

  const showConfirmationModal = () => {
    return new Promise((resolve) => {
      setConfirmModalData({
        open: true,
        onClose: (answer) => {
          resolve(answer);
        },
      });
    });
  };
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
            Our Trainers
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

          <button
            className="common-btn"
            onClick={() => {
              setEditMember({}), setShowModal(true);
            }}
          >
            Add Trainer <FitnessCenterIcon />
          </button>
        </div>
      </div>
      <div className="container">
        <div
          className="scrollable-container"
          style={{ minHeight: "74vh", maxHeight: "74vh" }}
        >
          <div className="d-flex flex-wrap mt-1">
            {loading ? (
              <>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "70vh", minWidth: "80vw" }}
                >
                  <div className="loader"></div>
                </div>
              </>
            ) : allTrainers.length > 0 ? (
              allTrainers.map((member, id) => {
                return (
                  <div className=" member-box text-center " key={id}>
                    <div
                      onClick={() =>
                        navigate("/trainer-details", {
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

                      <div className="fw-bold mt-2" style={{ color: "white" }}>
                        {" "}
                        {member.name}
                      </div>
                      <div>+91 {member?.phone_number}</div>
                    </div>
                    <span>
                      Joining :
                      <span className="">
                        {" "}
                        {formatDateToDisplay(member?.doj) ?? "--"}{" "}
                      </span>
                      <span className="dropdown">
                        <button
                          className="btn "
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <h6>
                            <MoreVertIcon sx={{ fontSize: "19px",color:"white" }} />
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
                              Edit
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
            ) : (
              <>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "70vh", minWidth: "80vw" }}
                >
                  <h5 className="text-primary">No Trainer Found !</h5>
                </div>
              </>
            )}
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
          title={`${editMember._id ? "Edit" : "Add"} Trainer `}
          handleSubmit={handleSubmit}
        >
          <Formik
            initialValues={
              editMember._id
                ? editMember
                : {
                    name: "",
                    gender: "male",
                    address: "",
                    phone_number: "",
                    emergency_number: "",
                    doj: new Date(),
                    profilePic: "",
                    training_exp: 1,
                    shift_timings: "Morning (6AM - 12PM)",
                    specialization: "",
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
                        <div className="row">
                          <div className="container">
                            <div className="row ">
                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter Name"
                                    value={props.values.name}
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

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="gender">Gender</label>
                                  <select
                                    className="form-control"
                                    id="gender"
                                    name="gender"
                                    value={props.values.gender} // Ensure it's `value`, not `values`
                                    onChange={(e) =>
                                      props.setFieldValue(
                                        "gender",
                                        e.target.value
                                      )
                                    } // Update state
                                  >
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6 mt-2">
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

                              <div className="col-md-6 mt-2 ">
                                <div className="form-group">
                                  <label htmlFor="phone-number">
                                    Phone Number
                                  </label>
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

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="emergency_number">
                                    Emergency Phone Number
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="emergency_number"
                                    placeholder="Enter Phone Number"
                                    value={props.values.emergency_number}
                                    name="emergency_number"
                                    // onChange={props.handleChange}
                                    onChange={(e) => {
                                      if (e.target.value.length < 11)
                                        props.setFieldValue(
                                          "emergency_number",
                                          e.target.value
                                        );
                                    }}
                                  />
                                </div>
                                <ErrorMessage
                                  name="emergency_number"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </div>

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="joining-date">
                                    Joining Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="joining-date"
                                    name="doj"
                                    value={
                                      props.values?.doj
                                        ? formatDateToInput(props.values.doj)
                                        : ""
                                    }
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        "doj",
                                        e.target.value
                                      );
                                    }}
                                  />
                                </div>
                                <ErrorMessage
                                  name="doj"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </div>

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="membership">
                                    Training Experience
                                  </label>
                                  <select
                                    className="form-control"
                                    id="training_exp"
                                    name="training_exp"
                                    value={props.values.training_exp} // Ensure it's `value`, not `values`
                                    onChange={(e) =>
                                      props.setFieldValue(
                                        "training_exp",
                                        e.target.value
                                      )
                                    } // Update state
                                  >
                                    <option value={1}>1 year</option>
                                    <option value={2}>2 year</option>
                                    <option value={3}>3 year</option>
                                    <option value={4}>4 year</option>
                                    <option value={5}>5+ years</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="shift_timings">
                                    Shift & Timings
                                  </label>
                                  <select
                                    className="form-control"
                                    id="shift_timings"
                                    name="shift_timings"
                                    value={props.values.shift_timings} // Ensure it's `value`, not `values`
                                    onChange={(e) =>
                                      props.setFieldValue(
                                        "shift_timings",
                                        e.target.value
                                      )
                                    } // Update state
                                  >
                                    <option value={"Morning (6AM - 12PM)"}>
                                      Morning (6AM - 12PM){" "}
                                    </option>
                                    <option value={"Evening (4PM - 10PM)"}>
                                      Evening (4PM - 10PM)
                                    </option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="pic">Profile Pic</label>
                                  <br />

                                  {props.values.profilePic.name ||
                                  props.values.profilePic == "" ? (
                                    <>
                                      <input
                                        type="file"
                                        className="form-control "
                                        id="pic"
                                        name="profilePic"
                                        onChange={(e) =>
                                          props.setFieldValue(
                                            "profilePic",
                                            e.target.files[0]
                                          )
                                        }
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={props.values?.profilePic}
                                        alt=""
                                        className="pic-form"
                                      />
                                      <br />
                                      <button
                                        className="common-btn mx-0"
                                        type="button"
                                        onClick={() =>
                                          props.setFieldValue("profilePic", "")
                                        }
                                      >
                                        Change Pic
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label htmlFor="specialization">
                                    specialization
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    id="specialization"
                                    rows={1}
                                    placeholder="Enter specialization"
                                    value={props.values.specialization}
                                    name="specialization"
                                    onChange={props.handleChange}
                                  />
                                </div>
                                <ErrorMessage
                                  name="specialization"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </div>
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
                          disabled={submitLoading}
                        >
                          {submitLoading ? "saving please wait" : "submit"}{" "}
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

      {confirmModalData.open && (
        <ConfirmModal
          title={"Are You Sure You Want to Delete"}
          setConfirmModalData={setConfirmModalData}
          onClose={confirmModalData.onClose}
        ></ConfirmModal>
      )}
    </>
  );
}
