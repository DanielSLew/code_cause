export const getColor = (name) => {
  const palette = {
    white: "#ffffff",
    lightgrey: "#f6f8fa",
    dark: "#0c131a",
    lightBorder: "#e1e4e8",
    primary: "#0070f3",
    secondary: "#f6f8fa",
  };
  return palette[name];
};

// Form Validation Values

export const VALID_PASSWORD_LENGTH = 8;
export const VALID_USERNAME_LENGTH = 4;
export const VALID_EMAIL_REGEX = /^.+@.+\..+/
