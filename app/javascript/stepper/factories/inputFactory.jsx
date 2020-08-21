import React from "react";

import TextBox from "components/textbox";
import TextInput from "components/input";

const GetInput = ({
  value,
  fn,
  placeholder,
  type,
  tag,
  id,
  className,
  disabled,
}) => {
  const inputs = {
    textInput: (
      <TextInput
        id={id}
        value={value}
        fn={fn}
        placeholder={placeholder}
        tag={tag}
        className={className}
      />
    ),
    textBox: (
      <TextBox
        id={id}
        value={value}
        fn={fn}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        tag={tag}
      />
    ),
  };
  return inputs[type];
};

const InputFactory = ({ input }) => {
  return <>{GetInput(input)}</>;
};

export default InputFactory;
