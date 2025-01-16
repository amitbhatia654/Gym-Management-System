import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Modal from "./HelperPages/Modal";
import { Formik, ErrorMessage, Form } from "formik";
import axiosInstance from "../ApiManager";
const dp_image = "../../images/user.jpg";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export default function JoinedMembers() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [editTopic, setEditTopic] = useState({});

  const handleSubmit = async (values) => {
    setloading(true);
    const res = editTopic._id
      ? await axiosInstance.put(`/api/topic`, {
          //   ...values,
          //   folderId: selectedFolder._id,
          //   topicId: editTopic._id,
        })
      : await axiosInstance.post(`/api/topic`, {
          ...values,
          //   selectedFolder,
        });

    setloading(false);
    if (res.status == 200) {
      toast.success(res.data.message);
      setEditTopic({});
      setShowModal(false);
    }
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
            Joined Members
          </span>
        </div>
        <div>
          <TextField
            type="text"
            sx={{ width: "200px", mt: 1 }}
            size="small"
            onChange={(e) => {
              //   setSearch(e.target.value);
              //   setCurrentPage(1);
            }}
            placeholder="search"
          ></TextField>

          <button className="common-btn" onClick={() => setShowModal(true)}>
            Add Member <FitnessCenterIcon />
          </button>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 member-box d-flex flex-column align-items-center ">
            <img src={dp_image} alt="" className="member-image" />
            Amit Bhatia
            <span>8726773631</span>
            <span>Next Bill Data :16-02-05</span>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          //   otherFunc={setEditTopic}
          title={`${editTopic._id ? "Edit" : "Add"} Member `}
          handleSubmit={handleSubmit}
        >
          <Formik
            initialValues={{ title: editTopic ? editTopic.title : "" }}
            // validationSchema={addEmployee}
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
                            <div class="form-group">
                              <label for="exampleInputEmail1">Name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                // aria-describedby="emailHelp"
                                placeholder="Enter Name"
                                // value={props.values.title}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div class="form-group">
                              <label for="exampleInputEmail1">
                                Phone Number
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div class="form-group">
                              <label for="exampleInputEmail1">Address</label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div class="form-group">
                              <label for="exampleInputEmail1">
                                Profile Pic
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div class="form-group">
                              <label for="exampleInputEmail1">
                                Joining Date
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div class="form-group">
                              <label for="exampleFormControlSelect1">
                                Membership Plan
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                              >
                                <option>1 Month</option>
                                <option>2 Month</option>
                                <option>3 Month</option>
                                <option>6 Month</option>
                              </select>
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
