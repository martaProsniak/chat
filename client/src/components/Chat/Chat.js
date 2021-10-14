import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import "./Chat.css";

let socket;

const Chat = ({location, history}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    socket.on("error", ({ error }) => {
      console.log(error);
      history.replace(`/?name=${error.name}&room=${error.room}`);
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });

    socket.on("message", ({ text }) => {
      console.log(text);
    });

    return () => {
      socket.emit("disconnected");

      socket.off();
    };
  }, [ENDPOINT, location.search, history]);
  return <h1>Chat</h1>;
};

export default Chat;
