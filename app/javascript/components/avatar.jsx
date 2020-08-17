import React from "react";
import styled from "styled-components";
import { User } from "react-feather";
import { getColor } from "../helpers";

const AvatarContainer = styled.div`
  /* position: absolute; */
  /* transform: translateX(-6.5rem); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: getColor("secondary");
  height: 35px;
  width: 35px;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid ${getColor("dark")};
  .avatar {
    height: 35px;
    width: 35px;
  }
`;

const Avatar = (props) => {
  return (
    <AvatarContainer>
      {props.avatar ? (
        <img
          src={props.avatar}
          alt={props.name}
          className="avatar-img avatar"
        />
      ) : (
        <User className="avatar-fallback-icon avatar" />
      )}
    </AvatarContainer>
  );
};

export default Avatar;
