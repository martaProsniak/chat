import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import TextContainer from "../TextContainer/TextContainer";

import "./Messages.css";

const Messages = ({messages, name, users, room}) => {
    return <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
      <TextContainer users={users} room={room}/>
  </ScrollToBottom>;
};

export default Messages;
