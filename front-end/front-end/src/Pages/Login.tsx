import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { Session } from '@supabase/supabase-js'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Navigate } from 'react-router-dom'

import { authentication } from '../Services/Authentication'

export const Login = () => {
    const [session, setSession] = useState<Session | null>()

    // TODO: duplicate code.. how to handle this best:
    useEffect(() => {
        authentication.supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        
        const {
            data: { subscription },
        } = authentication.supabaseClient.auth.onAuthStateChange((_event, session) => {
            if(session) authentication.loginUser();
            setSession(session);
        })
      
      return () => subscription.unsubscribe()
    }, [])
  
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