import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";

let socket;

const Chat = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    socket.on("error", ({ error }) => {
      if (error.name && error.room) {
        history.replace(`/?name=${error.name}&room=${error.room}`);
      } else {
        history.replace(`/?error=noData`);
      }
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });

    return () => {
      socket.off();
    };
  }, [ENDPOINT, location.search, history]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, () => setMessage(""));
  };


  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}></InfoBar>
        <Messages messages={messages} name={name}/>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
