import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { Session } from '@supabase/supabase-js'

import { Invite } from "../Pages/Invite";
import { Login } from "../Pages/Login";
import { Welcome } from "../Pages/Welcome";

import { AuthenticationStatus, auth } from "../Services/Authentication";

function AuthNavigator() {
  const location = useLocation();

  // TODO.. get rid of this whole code when state management is introduced
  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
      auth.supabaseClient.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
      })
      
      const {
          data: { subscription },
      } = auth.supabaseClient.auth.onAuthStateChange((_event, session) => {
          auth.loginUser();
          setSession(session);
      })
    
    return () => subscription.unsubscribe()
  }, []) 
  // -------------------

  useEffect(() => {
    const accessToken = location?.hash?.split("&")[0]?.split("=")[1]
    const refreshToken = location?.hash?.split("&")[3]?.split("=")[1]
    if (accessToken && refreshToken) {
      auth.welcomeUser(accessToken, refreshToken);
    } else {
      // TODO: errorhandling
    }
  });
 

  //if (auth.getAuthenticationStatus() === AuthenticationStatus.Authenticated) {
  if(session) {
    // TODO: different routes for different types of users.. Invite page only accessible to admin/association
    // Welcome to candidate/customer  etc ?
    return (
      <Routes>
        <Route path="invite/*" element={<Invite />} />
        <Route path="welcome/*" element={<Welcome />} />
      </Routes>
    );
  } else if (
    auth.getAuthenticationStatus() === AuthenticationStatus.AccessTokenInvalid
  ) {
    return <div>Access token invalid ... TODO</div>;
  } else return <Login />;
}
export default AuthNavigator;
