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
