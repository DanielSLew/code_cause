import React from "react";
import styled from "styled-components";

import { getColor } from "helpers/style";

export const StyledButton = styled.button`
  padding: 0.25rem 1rem;
  border-radius: ${(props) => props.radius};
  position: relative;
  outline: none;
  font-weight: 500;
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
  transition: 0.2s all;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.selected ? props.bgColor : props.color)};
  border: ${(props) => props.border};
  :hover {
    box-shadow: 5px 5px 3px -3px rgba(89, 89, 89, 0.3);
  }
  /* :focus {
    box-shadow: 5px 5px 3px -3px rgba(89, 89, 89, 0.3);
  } */
  .button-bar-icon {
    height: 40px;
    width: 40px;
  }

  & > * {
    pointer-events: none;
  }
  &.open-button {
    position: absolute;
    top: 6rem;
    left: 0;
    grid-column: 3/4;
  }
`;

const Button = ({
  className,
  fn,
  content,
  value,
  height,
  width,
  bgColor,
  color,
  border,
  radius,
  selected,
  disabled
}) => {
  if (disabled) bgColor = getColor('error');
  return (
    <StyledButton
      onClick={fn}
      value={value}
      disabled={disabled}
      height={height || "2.5rem"}
      width={width || "7rem"}
      fontSize={"1.2rem"}
      color={color || getColor("dark")}
      bgColor={bgColor || getColor("white")}
      radius={radius || "4px"}
      border={border || `1px solid ${getColor("lightBorder")}`}
      className={`${selected && "selected"} ${className}`}
    >
      {content}
    </StyledButton>
  );
};

export default Button;