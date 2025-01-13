import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ErrorMessage, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { addEmployee } from "../../assets/FormSchema";
import axiosInstance from "../../ApiManager";
import { useSelector } from "react-redux";

export default function CreateEmployeeData() {
  const user = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});

  const handleSubmit = async (values) => {
    setloading(true);
    const res = id
      ? await axiosInstance.put(`/api/employee/${id}`, {
          ...values,
          // _id: user.id,
        })
      : await axiosInstance.post(`/api/employee`, { ...values, _id: user.id });

    setloading(false);
    if (res.status == 200) {
      toast.success(res.data);
      navigate("/employees");
    }
  };

  const getEmpById = async () => {
    const result = await axiosInstance.get(`/api/employee/${id}`);
    if (result) {
      setData(result.data);
    } else {
      setData({});
    }
  };

  useEffect(() => {
    if (id) getEmpById();
  }, []);
  return (
    <>
      <Formik
        initialValues={
          id
            ? data
            : {
                empName: "",
                empEmail: "",
                empPhone: "",
                empDepartment: "",
                empAddress: "",
              }
        }
        validationSchema={addEmployee}
        enableReinitialize={true}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div
              className=" p-1 mt-1"
              style={{
                boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)",
                minHeight: "81vh",
              }}
            >
              <Button
                variant="outlined"
                type="button"
                sx={{
                  color: "#47478c",
                  backgroundColor: "white",
                  fontSize: "10px",
                }}
                onClick={() => navigate("/employees")}
              >
                <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              </Button>
              <div className="d-flex justify-content-center ">
                <h2
                  className="text-decoration-underline"
                  style={{ color: "#47478C" }}
                >
                  {id ? "Edit" : "Add"} Employee
                </h2>
              </div>
              <div className="container p-2">
                <div className="row">
                  <div className="col-md-4">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ m: 1 }}
                    >
                      <InputLabel
                        shrink={Boolean(props.values.empName)}
                        htmlFor="empName"
                      >
                        Name
                      </InputLabel>
                      <OutlinedInput
                        id="empName"
                        name="empName"
                        placeholder="enter name"
                        value={props.values.empName}
                        onChange={props.handleChange}
                        label="Name"
                      />
                    </FormControl>
                    <ErrorMessage
                      name="empName"
                      component={"div"}
                      className="text-danger"
                    ></ErrorMessage>
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ m: 1 }}
                    >
                      <InputLabel
                        shrink={Boolean(props.values.empEmail)} // Label stays at the top when there's a value
                        htmlFor="empEmail"
                      >
                        Email
                      </InputLabel>
                      <OutlinedInput
                        id="empEmail"
                        name="empEmail"
                        placeholder="enter email"
                        type="email"
                        value={props.values.empEmail}
                        onChange={props.handleChange}
                        label="Email" // Links InputLabel with OutlinedInput
                      />
                    </FormControl>
                    <ErrorMessage
                      name="empEmail"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ m: 1 }}
                    >
                      <InputLabel
                        shrink={Boolean(props.values.empPhone)} // Keeps label at the top when there's a value
                        htmlFor="empPhone"
                      >
                        Phone Number
                      </InputLabel>
                      <OutlinedInput
                        id="empPhone"
                        name="empPhone"
                        placeholder="enter phone number"
                        type="number"
                        value={props.values.empPhone}
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            props.setFieldValue("empPhone", e.target.value);
                          }
                        }}
                        label="Phone Number" // Links InputLabel with OutlinedInput
                      />
                    </FormControl>
                    <ErrorMessage
                      name="empPhone"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ m: 1 }}
                    >
                      <InputLabel
                        shrink={Boolean(props.values.empDepartment)} // Keeps label at the top when there's a value
                        htmlFor="empDepartment"
                      >
                        Department
                      </InputLabel>
                      <OutlinedInput
                        id="empDepartment"
                        name="empDepartment"
                        placeholder="enter department"
                        value={props.values.empDepartment}
                        onChange={props.handleChange}
                        label="Department" // Links InputLabel with OutlinedInput
                      />
                    </FormControl>
                    <ErrorMessage
                      name="empDepartment"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ m: 1 }}
                    >
                      <InputLabel
                        shrink={Boolean(props.values.empAddress)}
                        htmlFor="empAddress"
                      >
                        Address
                      </InputLabel>
                      <OutlinedInput
                        id="empAddress"
                        name="empAddress"
                        placeholder="enter address"
                        value={props.values.empAddress}
                        onChange={props.handleChange}
                        label="Address"
                      />
                    </FormControl>
                    <ErrorMessage
                      name="empAddress"
                      component="div"
                      className="text-danger"
                    />
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
    </>
  );
}
