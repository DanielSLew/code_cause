import { version } from 'helpers/api';

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

export const loginUser = async ({ setUser, params, setIsLoading, toggleModal }) => {
  setIsLoading(true); 
  const options = { method: 'POST', headers, body: JSON.stringify(params) };

  const response = await fetch(`${version}/login`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    // handle error message
  } else {
    localStorage.setItem("token", data.jwt);
    setUser(data.user);
    toggleModal();
  }
};

export const autoLogin = async ({ setUser }) => {
  const token = localStorage.getItem("token");
  if (token) {
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetch(`${version}/auto_login`, options);
    const data = await response.json();
    setUser(data);
  }
}

export const handleLogout = ({ setUser }) => {
  setUser({});
  localStorage.removeItem("token");
};

export const getUser = async ({ setUser, id }) => {
  const response = await fetch(`${version}/users/${id}`);
  const data = await response.json();
  setUser(data.user);
}

export const createUser = async ({ setUser, params, setIsLoading, toggleModal }) => {
  setIsLoading(true);
  const options = { method: 'POST', headers, body: JSON.stringify(params) };

  const response = await fetch(`${version}/users`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    // handle error message
  } else {
    localStorage.setItem("token", data.jwt);
    setUser(data.user);
    toggleModal();
  }
};

export const updateUser = async ({ setUser, id, params, setIsLoading }) => {
  const options = { method: 'PUT', headers, body: JSON.stringify(params) };

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
  const options = { method: 'DELETE', headers };

  const response = await fetch(`${version}/users/${id}`, options);
  const data = await response.json();
  if (data.error) {
    setIsLoading(false);
    // handle error message
  } else {
    handleLogout(setUser);
  }
};