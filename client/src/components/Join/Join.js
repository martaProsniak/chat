import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import "./Join.css";

const Join = ({location}) => {
  const { name, room } = queryString.parse(location.search);
  const [_name, set_Name] = useState("");
  const [_room, set_Room] = useState("");
  const [queryRoom, setQueryRoom] = useState("");
  
  useEffect(() => {
    if (room) {
      set_Room(room);
      setQueryRoom(room);
    }
  }, [location.search, room])

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            className="joinInput"
            placeholder="Name"
            type="text"
            onChange={(event) => {
              set_Name(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="joinInput mt-20"
            placeholder="Room"
            type="text"
            value={room}
            onChange={(event) => {
              set_Room(event.target.value);
            }}
          />
        </div>
        <Link
          onClick={(event) =>
            !_name || !_room ? event.preventDefault() : null
          }
          to={`/chat?name=${_name}&room=${_room}`}
        >
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </Link>
        {name && (
          <p className="error mt-20">
            <span>
              User {name} is already chatting in the room {queryRoom}.
            </span>
            <span className="mt-10 dB">Pick another name or another room.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Join;
