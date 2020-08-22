import React, { useEffect, useContext } from "react";

import Routes from "routes/Routes";
import { UserContext } from "contexts/userContext";

import { autoLogin } from 'actions/user';

const App = (props) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => { autoLogin({ setUser }) }, []);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
