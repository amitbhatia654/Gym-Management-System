import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export default function Order() {
  const socket = useMemo(() => io(import.meta.env.VITE_API_URL), []);

  // console.log(socket, "the socket");

  const [socketId, setSocketId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connecting", (data) => {
      setSocketId(data), console.log(data, "the user");
    });

    socket.on("recieve-msg", (msg) => {
      console.log("recieve msg", msg);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("message", { message, roomId });
    setMessage("");
    setRoomId("");
  };

  return (
    <div>
      <h5>Socket-{socketId}</h5>
      enter Room Id
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      ></input>
      <br></br>
      enter Message
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
}
