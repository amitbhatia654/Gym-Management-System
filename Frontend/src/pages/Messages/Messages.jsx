import React, { useEffect, useMemo, useState } from "react";
import ContainerPage from "../HelperPages/ContainerPage";
import Modal from "../HelperPages/Modal";
import axiosInstance from "../../ApiManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import { SendMessage } from "../../../../Backend/Controller/chat-controller";

export default function Messages() {
  const user = useSelector((user) => user.cart);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [allchats, setAllChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  var socket = useMemo(() => io(import.meta.env.VITE_API_URL), []);

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
    return () => socket.disconnect();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/users", {
      //    params: { search, rowSize, currentPage },
    });
    if (res.status == 200) {
      setUsers(res.data.response);
      //    setTotalCount(res.data.totalCount);
    } else {
      setUsers([]);
      //    setTotalCount(0);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const res = await axiosInstance.post("/api/chat/newchat", {
      recieverId: newUser,
    });
  };

  const fetchAllChats = async () => {
    // setLoading(true);
    const res = await axiosInstance.get("/api/chat/allChats");
    if (res.status == 200) {
      setAllChats(res.data.chats);
    } else {
      setAllChats([]);
    }
    // setLoading(false);
  };

  const SendMessage = async () => {
    const receiverId = selectedUser.participants.filter(
      (data) => data._id != user.id
    )[0]._id;

    const res = await axiosInstance.post("/api/chat/sendMessage", {
      receiverId,
      message,
    });

    console.log(res, "the ressss");

    socket.emit("send_message", {
      room: selectedUser._id,
      message: res.data.chats,
    });
    // console.log(res, "the response is for post");
  };

  useEffect(() => {
    fetchData();
    fetchAllChats();
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      // console.log(data, "recieved");
      setSelectedUser(data);
    });
  });
  return (
    <ContainerPage title={"messages"}>
      <div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          New Chat
        </button>
        <div className="container my-4 m-2">
          <div className="row">
            <div
              className="col-md-2 border border-primary"
              style={{ height: "400px" }}
            >
              {" "}
              <h4>All Chats</h4>
              {allchats?.map((chat, key) => {
                return (
                  <div
                    onClick={(e) => {
                      socket.emit("join chat", chat._id);
                      setSelectedUser(chat);
                    }}
                    key={key}
                  >
                    {
                      chat.participants.filter((data) => data._id != user.id)[0]
                        .name
                    }
                  </div>
                );
              })}
            </div>
            <div className="col-md-9 border mx-1 border-primary">
              <h4>
                {" "}
                {selectedUser?.participants?.filter(
                  (data) => data._id != user.id
                )[0].name || "Message Box"}
              </h4>

              {selectedUser.participants && (
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-12"
                      style={{ border: "1px solid ", height: "310px" }}
                    >
                      {/* <h6>first</h6> */}
                      {/* <h6 className="text-end">second</h6> */}

                      {/* {console.log(selectedUser, "selected user")} */}
                      {console.log(selectedUser, "selected user is ")}
                      {selectedUser.messages.map((data) => {
                        return (
                          <h6
                            className={`${
                              data.senderId == user.id && "text-end"
                            }`}
                          >
                            {data.message}
                          </h6>
                        );
                      })}
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => SendMessage()}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <Modal
            setShowModal={setShowModal}
            title={" New chat"}
            handleSubmit={handleSubmit}
          >
            <p>Select User</p>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={{ value: newUser }}
                onChange={(e) => {
                  setNewUser(e.target.value);
                }}
              >
                {users.map((user) => {
                  return <MenuItem value={user._id}>{user.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Modal>
        )}
      </div>
    </ContainerPage>
  );
}
