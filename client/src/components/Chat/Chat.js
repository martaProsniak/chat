import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    socket.on("newUser", ({ user }) => {
      console.log(user);
    });

    socket.on("error", ({ error }) => {
      console.log(error);
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
