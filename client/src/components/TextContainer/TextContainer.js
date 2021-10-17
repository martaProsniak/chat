import React from "react";

import "../Messages/Message/Message.css";

const TextContainer = ({ users, room }) => {
  return (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark pl-10">
          Users in the room {room}
          {": "}
          {users.map((user, i) => (
            <span key={i}>
              {user.name}
              {i !== users.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
      <p className="sentText pl-10">admin</p>
    </div>
  );
};

export default TextContainer;
