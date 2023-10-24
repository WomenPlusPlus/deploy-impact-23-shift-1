import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { Routes, Route, useLocation } from 'react-router-dom';
import { RootState } from '../Services/Store';
import Link from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Login } from "../Pages/Login";
import { SignUp } from "../Pages/SignUp";
import { PasswordReset } from '../Pages/PasswordReset';

import { authentication } from "../Services/Authentication";
import { AuthenticationStatus } from '../Services/AuthenticationSlice';
import { SideBar } from './SideBar';
import { authorization, MMMenuItem } from "./Authorization";

import './SideBar.css';

function AuthNavigator() {
  const location = useLocation();

    const authenticationStatus: AuthenticationStatus = useSelector(
        (state: RootState) => state.auth.status
    );

  const pathName:string | null = location?.pathname?.split("/")[1]
  useEffect(() => {
    const accessToken:string | null = location?.hash?.split("&")[0]?.split("=")[1]
    const refreshToken:string | null = location?.hash?.split("&")[3]?.split("=")[1]
    if (accessToken && refreshToken && pathName && pathName === "signup") {
      if(authenticationStatus === AuthenticationStatus.NotAuthenticated ||
        authenticationStatus === AuthenticationStatus.LoggedOut) {
        authentication.inviteeLogin(accessToken, refreshToken);
      }
      if(window.location.hash) {
        window.history.replaceState("", document.title, window.location.pathname);
      }
    } else {
      // TODO: errorhandling
    }
  });

  if(pathName === "passwordreset") {
    return(<PasswordReset />);
  } else if(authenticationStatus === AuthenticationStatus.Pending ||
    (pathName === "signup" && (authenticationStatus === AuthenticationStatus.NotAuthenticated || authenticationStatus === AuthenticationStatus.LoggedOut))) {
    return <div>Processing...</div>
  } else if (authenticationStatus === AuthenticationStatus.InviteeAuthenticated) {    
    return (
      <Routes>
        <Route key="root" path="/*" element={<SignUp />} />
        <Route key="signup" path="signup/*" element={<SignUp />} />
      </Routes>
    );
  } else if (authenticationStatus === AuthenticationStatus.Authenticated) {
    return (
      <Box
          sx={{ display: 'flex' }}
          bgcolor={'#FBFCFD'}
          minHeight={'100%'}
          padding={2}
      >
        <SideBar></SideBar>
        <Routes>
          <Route path="/*" element={authorization.getMyMainPage()} />
          { authorization.getMyRoutes().map((route:MMMenuItem) =>  (
            <Route key={route.path} path={route.path+"/*"} element={route.page} />
          ))}
        </Routes>
      </Box>
    );
  } else if (
    authenticationStatus === AuthenticationStatus.AccessTokenInvalid
  ) {
    return <div>Access token invalid ... TODO</div>;
  } else if (
    authenticationStatus === AuthenticationStatus.SignupFailed
  ) {
    //TODO: change message when testing complete:
    return <div>Signup failed .. you probably were already registered to database (change this message when testing complete)</div>;
  } else if (
    authenticationStatus === AuthenticationStatus.LoginInvalid
  ) {
    return <div>
      Login failed ... TODO
      <Link href="#"
        onClick={() => {authentication.logOut()}}>
          To login page.
      </Link>
    </div>;
  } else if (
    authenticationStatus === AuthenticationStatus.NotAuthenticated ||
    authenticationStatus === AuthenticationStatus.LoggedOut
  ) {
    return(<Login />);
  }  

    return <div>Something unexpected happened</div>;
}
export default AuthNavigator;
