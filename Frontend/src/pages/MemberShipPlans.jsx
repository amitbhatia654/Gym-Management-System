import React, { useEffect, useState } from "react";
import ContainerPage from "./HelperPages/ContainerPage";
import Modal from "./HelperPages/Modal";
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "@mui/material";
import axiosInstance from "../ApiManager";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MemberShipPlans() {
  const [showModal, setShowModal] = useState(false);
  const [editPlan, setEditPlan] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (values) => {
    // return console.log(values, "values");
    setSubmitLoading(true);

    const res = editPlan._id
      ? await axiosInstance.put(`/api/gym/member`, values)
      : await axiosInstance.post(`/api/gym/membershipPlans`, values);

    setSubmitLoading(false);
    if (res.status == 200) {
      toast.success(res.data.message);

      queryClient.setQueryData(["memberPlan"], (currentData) => {
        currentData.push(res.data.result);
      });
      setShowModal(false);
    }
  };

  const fetchAllPlans = async () => {
    const res = await axiosInstance.get(`/api/gym/membershipPlans`);
    return res.data.response;
  };

  const { data } = useQuery({
    queryKey: ["memberPlan"],
    queryFn: fetchAllPlans,
  });

  const deletePlan = async (id) => {
    const res = await axiosInstance.delete(`/api/gym/membershipPlans`, {
      data: { planId: id },
    });

    return res;
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePlan(id),
    onSuccess: (data, id) => {
      toast.success(data.data.message);
      queryClient.setQueryData(["memberPlan"], (currentData) => {
        return currentData.filter((plan) => plan._id != id);
      });
    },
    onError: (data, id) => {
      console.log(data, "the error");
    },
  });

  return (
    <ContainerPage
      title={"Membership Plans"}
      btnTitle={"Add MemberShip Plans"}
      onBtnClick={() => setShowModal(true)}
    >
      <div className="container mt-3">
        <div className="row">
          {data?.length > 0 ? (
            data.map((plan, key) => {
              return (
                <div key={key} className="col-md-2 mt-3">
                  <div className="plan-box">
                    <div>
                      <div className="">{plan.months} Months Plan</div>
                      <div className="mt-2">
                        Fees ₹{plan.fees}{" "}
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
                                  // setEditMember(member), setShowModal(true);
                                }}
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => deleteMutation.mutate(plan._id)}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          title={`${editPlan._id ? "Edit" : "Add"} Membership Plans `}
          handleSubmit={handleSubmit}
          size="modal-md"
        >
          <Formik
            initialValues={
              editPlan._id
                ? {
                    ...editPlan,
                  }
                : {
                    months: "",
                    fees: "",
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="months">Membership Months</label>
                          <input
                            type="number"
                            className="form-control"
                            id="months"
                            placeholder="Enter Membership Months"
                            value={props.values.months}
                            name="months"
                            onChange={props.handleChange}
                          />

                          <ErrorMessage
                            name="months"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12 ">
                        <div className="form-group">
                          <label htmlFor="fees">Membership Fee</label>
                          <input
                            type="number"
                            className="form-control"
                            id="fees"
                            placeholder="Enter Membership Fee"
                            value={props.values.fees}
                            name="fees"
                            onChange={props.handleChange}
                          />
                        </div>
                        <ErrorMessage
                          name="fees"
                          component="div"
                          style={{ color: "red" }}
                        />
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
    </ContainerPage>
  );
}
