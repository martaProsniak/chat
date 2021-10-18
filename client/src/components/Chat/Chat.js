import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";


import "./Chat.css";

let socket;

const Chat = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.NODE_ENV === 'production' ? "https://joinchatroom.herokuapp.com" : 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        history.replace(`/?error=${error}`);
      }
    });

    return () => {
      socket.off();
    };
  }, [ENDPOINT, location.search, history]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", (users) => {
      setUsers([...users.users]);
    });
  }, [users])

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, () => setMessage(""));
  };


  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}></InfoBar>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;
