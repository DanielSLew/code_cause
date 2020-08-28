import { version } from "helpers/api";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const localStorageSupported = () => {
  try {
    const testKey = "__testKey__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
};

export const loginUser = async ({
  setUser,
  params,
  setIsLoading,
  toggleModal,
}) => {
  setIsLoading(true);
  const options = { method: "POST", headers, body: JSON.stringify(params) };
  const response = await fetch(`${version}/login`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    // handle error message
  } else {
    if (localStorageSupported()) localStorage.setItem("token", data.jwt);
    setUser(data.user);
    toggleModal();
  }
};

export const autoLogin = async ({ setUser }) => {
  if (localStorageSupported()) {
    const token = localStorage.getItem("token");

    if (token) {
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const response = await fetch(`${version}/auto_login`, options);
      const data = await response.json();
      setUser(data);
    }
  }
};

export const logoutUser = ({ setUser }) => {
  setUser({});
  if (localStorageSupported()) localStorage.removeItem("token");
};

export const getUser = async ({ setUser, id }) => {
  const response = await fetch(`${version}/users/${id}`);
  const data = await response.json();
  setUser(data.user);
};

export const createUser = async ({
  setUser,
  params,
  setIsLoading,
  toggleModal,
}) => {
  setIsLoading(true);
  const options = { method: "POST", headers, body: JSON.stringify(params) };
  console.log(options);

  const response = await fetch(`${version}/users`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    console.warn(data.error);
  } else {
    if (localStorageSupported()) localStorage.setItem("token", data.jwt);
    setUser(data.user);
    toggleModal();
  }
};

export const updateUser = async ({ setUser, id, params, setIsLoading }) => {
  const options = { method: "PUT", headers, body: JSON.stringify(params) };

  const response = await fetch(`${version}/users/${id}`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    // handle error message
  } else {
    setUser(data.user);
  }
};

export const deleteUser = async ({ setUser, id, setIsLoading }) => {
  const options = { method: "DELETE", headers };

  const response = await fetch(`${version}/users/${id}`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    // handle error message
  } else {
    logoutUser(setUser);
  }
};
