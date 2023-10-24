import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Auth } from '@supabase/auth-ui-react'
import { Session } from '@supabase/supabase-js'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Navigate } from 'react-router-dom'

import { RootState } from '../Services/Store';
import { authentication } from '../Services/Authentication'
import { AuthenticationStatus } from '../Services/AuthenticationSlice';

export const Login = () => {
    const authenticationStatus:AuthenticationStatus = useSelector((state: RootState) => state.auth.status);
    const [session, setSession] = useState<Session | null>()

    
    useEffect(() => {
        authentication.supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        
        const {
            data: { subscription },
        } = authentication.supabaseClient.auth.onAuthStateChange((_event, session) => {
            if(authenticationStatus !== AuthenticationStatus.InviteeAuthenticated || session) authentication.loginUser();
            setSession(session);
        })
      
      return () => subscription.unsubscribe();    
    }, [authenticationStatus])
  
    if (!session) {
        return (<Auth supabaseClient={authentication.supabaseClient} appearance={{ theme: ThemeSupa }} 
            providers={[]}
            localization={{
            variables: {
                sign_in: {
                    email_label: 'Your email address',
                password_label: 'Your password',
            },
              sign_up: {
                link_text: ""  // this makes the create new account link disappear
              }
            },
        }}
        />)
    } else {
        return <Navigate to="/" />
    }
        
}