import { useEffect } from 'react'
import { useSelector } from 'react-redux/es/exports';
import { Routes, Route, useLocation } from "react-router-dom";
import { RootState } from '../Services/Store';

import { Invite } from "../Pages/Invite";
import { Login } from "../Pages/Login";
import { Welcome } from "../Pages/Welcome";

import { authentication } from "../Services/Authentication";
import { AuthenticationStatus } from '../Services/AuthenticationSlice';

function AuthNavigator() {
  const location = useLocation();

  const authenticationStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    const accessToken = location?.hash?.split("&")[0]?.split("=")[1]
    const refreshToken = location?.hash?.split("&")[3]?.split("=")[1]
    if (accessToken && refreshToken) {
      authentication.welcomeUser(accessToken, refreshToken);
      if(window.location.hash) {
        window.history.replaceState("", document.title, window.location.pathname);
      }
    } else {
      // TODO: errorhandling
    }
  });

  if (authenticationStatus === AuthenticationStatus.Authenticated) {
    // TODO: different routes for different types of users.. Invite page only accessible to admin/association
    // Welcome to candidate/customer  etc ?
    return (
      <Routes>
        <Route path="invite/*" element={<Invite />} />
        <Route path="welcome/*" element={<Welcome />} />
      </Routes>
    );
  } else if (
    authenticationStatus === AuthenticationStatus.AccessTokenInvalid
  ) {
    return <div>Access token invalid ... TODO</div>;
  } else return <Login />;
}
export default AuthNavigator;
