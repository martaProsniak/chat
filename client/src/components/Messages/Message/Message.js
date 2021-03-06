import React from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  const { user, text } = message;

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark pl-10">
          {ReactEmoji.emojify(text)}
        </p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Message;
