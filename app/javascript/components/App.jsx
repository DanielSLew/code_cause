import React, { useEffect, useContext } from "react";
import Routes from "../routes/Index";
import { UserContext } from '../contexts/userContext';

const App = (props) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('/api/v1/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
        });
    }
  }, []);

  return(
  <>
    <Routes/>
  </>
  )
}

export default App;
