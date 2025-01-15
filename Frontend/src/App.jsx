import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Main_dashBoard from "./pages/dashboard/Main_dashBoard";
import LoginSignupPage from "./pages/LoginSignupPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import Employee from "./pages/EmployeeManagement/Employee";
import CreateEmployeeData from "./pages/EmployeeManagement/CreateEmployeeData";
import PrivateRoute from "./pages/PrivateRoute";
import SignUp from "./pages/EmployeeManagement/SignUp";
import MyProfile from "./pages/MyProfile";
import ErrorPage from "./pages/ErrorPage";
import Customers from "./pages/Customers";
import Order from "./pages/Order";
import Setting from "./pages/Setting";
import { useEffect } from "react";
import UserDetails from "./pages/Users/UsersDetails";
import UpdateProfile from "./pages/UpdateProfile";
import Messages from "./pages/Messages/Messages";
import LoginRegister from "./Components/LoginRegister";
// import { io } from "socket.io-client";

function App() {
  const isUserLogin = () => {
    return Boolean(localStorage.getItem("token"));
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--box-color",
      localStorage.getItem("color")
    );

    // const socket = io(import.meta.env.VITE_API_URL);
    // console.log(socket, "socket");
  }, []);

  // eslint-disable-next-line react/prop-types
  const ProtectedLoginRoute = ({ children }) => {
    if (isUserLogin()) {
      return <Navigate to="/" replace></Navigate>;
    }
    return children;
  };

  return (
    <>
      <Routes>
        {" "}
        <Route
          path="/login"
          element={
            <ChakraProvider>
              <ProtectedLoginRoute>
                <LoginRegister />
              </ProtectedLoginRoute>
            </ChakraProvider>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <ChakraProvider>
              <ProtectedLoginRoute>
                <LoginRegister />
              </ProtectedLoginRoute>
            </ChakraProvider>
          }
        ></Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Main_dashBoard></Main_dashBoard>}></Route>
          <Route path="users" element={<UserDetails />}></Route>
          <Route path="update-profile" element={<UpdateProfile />}></Route>
          <Route path="employees" element={<Employee />}></Route>
          <Route path="all members" element={<div>All Members</div>}></Route>

          <Route path="messages" element={<Messages />}></Route>
          <Route path="profile" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="/add-new-employee"
            element={<CreateEmployeeData />}
          ></Route>
          <Route path="customers" element={<Customers />}></Route>
          <Route path="orders" element={<Order />}></Route>
          <Route path="settings" element={<Setting />}></Route>
        </Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
