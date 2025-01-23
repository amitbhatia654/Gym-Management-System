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
import moment from "moment";

export default function JoinedMembers() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editMember, setEditMember] = useState({});
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [allMembers, setAllMembers] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);
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
    // return console.log(values, "values");
    setSubmitLoading(true);

    var data = {
      ...values,
      planRenew: moment(values.planRenew).format(),
      doj: moment(values.doj).format(),
    };

    if (editMember._id) data.type = "edit";
    if (values?.profilePic?.name) {
      const base64 = await convertFileToBase64(values?.profilePic);
      data.profilePic = base64;
    }


    const res = editMember._id
      ? await axiosInstance.put(`/api/gym/member`, data)
      : await axiosInstance.post(`/api/gym/member`, data);

    setSubmitLoading(false);
    if (res.status == 200) {
      if (editMember._id) {
        if (res.data.memberResult.status == "active") {
          const updatedMember = allMembers.map((folder) => {
            if (folder._id == values._id) {
              return res.data.memberResult;
            }
            return folder;
          });
          setAllMembers(updatedMember);
        } else {
          const updatedMembers = allMembers.filter(
            (member) => member._id !== res.data.memberResult._id
          );
          setAllMembers(updatedMembers);
        }
      } else {
        if (
          allMembers.length < rowSize &&
          res.data.memberResult.status == "active"
        )
          allMembers.push(res.data.memberResult);
        else {
          const updatedMembers = allMembers.filter(
            (member) => member._id !== res.data.memberResult._id
          );
          setAllMembers(updatedMembers);
        }
      }
      toast.success(res.data.message);
      setEditMember({});
      setShowModal(false);
    }
  };

  const deleteMember = async (memberId) => {
    // console.log(memberId);
    const userResponse = await showConfirmationModal();
    if (userResponse != "yes") return;
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
    const type = "active";

    const res = await axiosInstance.get("/api/gym/member", {
      params: { search, rowSize, currentPage, type },
    });
    console.log(res.data.response, "api response is");
    if (res.status == 200) {
      setAllMembers(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllMembers([]);
      setTotalCount(0);
    }
    setloading(false);
  };

  const fetchTrainersList = async () => {
    const res = await axiosInstance.get("/api/gym/trainers-list", {
      params: {},
    });
    if (res.status == 200) {
      setAllTrainers(res.data.response);
    } else {
      setAllTrainers([]);
    }
  };

  useEffect(() => {
    fetchTrainersList();
  }, []);

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
            Active Members
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
            Add Member <FitnessCenterIcon />
          </button>
        </div>
      </div>
      <div className="">
        <div
          className="scrollable-container"
          style={{ minHeight: "75.5vh", maxHeight: "75.5vh" }}
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
            ) : allMembers.length > 0 ? (
              allMembers.map((member, id) => {
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

                      <div className="fw-bold mt-2" style={{ color: "blue" }}>
                        {" "}
                        {member.name}
                      </div>
                      <div>+91 {member?.phone_number}</div>
                    </div>
                    <span>
                      Valid Till :
                      <span className="">
                        {" "}
                        {formatDateToDisplay(member?.lastPayment.validTill) ??
                          "--"}{" "}
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
                  <h5 style={{ color: "#47478C" }}>No Members Found !</h5>
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
          title={`${editMember._id ? "Edit" : "Add"} Member `}
          handleSubmit={handleSubmit}
        >
          <Formik
            initialValues={
              editMember._id
                ? {
                    ...editMember,
                    planRenew: editMember.lastPayment.planRenew,
                    paymentMode: editMember.lastPayment.paymentMode,
                    memberPlan: editMember.lastPayment.memberPlan,
                    assigned_trainer: editMember?.assigned_trainer?._id,
                  }
                : {
                    name: "",
                    address: "",
                    gender: "male",
                    phone_number: "",
                    emergency_number: "",
                    assigned_trainer: "",
                    doj: new Date(),
                    planRenew: new Date(),
                    memberPlan: 1,
                    profilePic: "",
                    paymentMode: "cash",
                  }
            }
            // validationSchema={addMember}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <div className=" ">
                  <div className="container">
                    <div className="row ">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Name</label>
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

                      <div className="col-md-6 ">
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

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="gender"> Gender</label>
                          <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={props.values.gender} // Ensure it's `value`, not `values`
                            onChange={(e) =>
                              props.setFieldValue("gender", e.target.value)
                            } // Update state
                          >
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 mt-3 ">
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

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="phone-number">
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

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="joining-date">Joining Date</label>
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

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="membership">Assigned Trainer</label>
                          <select
                            className="form-control"
                            id="assigned_trainer"
                            name="assigned_trainer"
                            value={props.values.assigned_trainer} // Controlled by Formik
                            onChange={props.handleChange} // Formik's change handler
                          >
                            <option value="">Select Trainer</option>{" "}
                            {allTrainers.map((trainer) => (
                              <option key={trainer._id} value={trainer._id}>
                                {trainer.name}
                              </option>
                            ))}
                          </select>

                          <ErrorMessage
                            name="assigned_trainer"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="membership">Membership Plan</label>
                          <select
                            className="form-control"
                            id="memberPlan"
                            name="memberPlan"
                            value={props.values.memberPlan} // Ensure it's `value`, not `values`
                            onChange={(e) =>
                              props.setFieldValue("memberPlan", e.target.value)
                            } // Update state
                          >
                            <option value={1}>1 Month</option>
                            <option value={2}>2 Month</option>
                            <option value={3}>3 Month</option>
                            <option value={6}>6 Month</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="planRenew">Plan starts</label>
                          <input
                            type="date"
                            className="form-control"
                            id="planRenew"
                            name="planRenew"
                            value={
                              props.values?.planRenew
                                ? formatDateToInput(props.values.planRenew)
                                : ""
                            }
                            onChange={(e) => {
                              props.setFieldValue("planRenew", e.target.value);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="planRenew"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="membership">Payment Mode</label>
                          <select
                            className="form-control"
                            id="paymentMode"
                            name="paymentMode"
                            value={props.values.paymentMode} // Ensure it's `value`, not `values`
                            onChange={(e) =>
                              props.setFieldValue("paymentMode", e.target.value)
                            } // Update state
                          >
                            <option value={"cash"}>Cash</option>
                            <option value={"online"}>Online</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 mt-3">
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
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
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
                      {submitLoading ? (
                        <span className="spinner-border "></span>
                      ) : (
                        "submit"
                      )}{" "}
                    </Button>
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
