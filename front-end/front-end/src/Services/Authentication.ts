import { SupabaseClient, createClient } from '@supabase/supabase-js'

import { store } from "./Store";
import { login, inviteeLogin, inviteeLoginFail, logout } from './AuthenticationSlice';

class Authentication {
    appUrl:string = process.env.REACT_APP_APP_URL ? process.env.REACT_APP_APP_URL : "";
    supabaseUrl:string = process.env.REACT_APP_SUPABASE_URL ? process.env.REACT_APP_SUPABASE_URL : "";
    supabaseKey:string = process.env.REACT_APP_SUPABASE_KEY ? process.env.REACT_APP_SUPABASE_KEY : "";
    supabaseServiceKey:string = process.env.REACT_APP_SUPABASE_SERVICE_KEY ? process.env.REACT_APP_SUPABASE_SERVICE_KEY : "";
    supabaseClient:SupabaseClient;
    adminSupabaseClient:SupabaseClient | null;

    constructor() {
        this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);

        // TODO: add a check for only admin / association users to have access to this
        // do not even create this unless is admin / association
        this.adminSupabaseClient = createClient(this.supabaseUrl, this.supabaseServiceKey);
    }

    async inviteUser(email:string) {
        
        /* do we need user metadata?
        const userData = {
            email: email,
            // TODO: will this be used ??
            user_metadata: { type: 'candidate' }
        }
        */

        // TODO: handling of sending invitation twice to same person
        if(this.adminSupabaseClient) {
            const { data: user, error } = await this.adminSupabaseClient.auth.admin
                        .inviteUserByEmail(email, 
                            { redirectTo: this.appUrl+"/welcome#" })
            if(error) {
                console.log("error", error)
                // TODO: error handling
            } else if(user) {
                //console.log("user", user)
                // TODO: send to backend info that user was invited
                // (user.email, user.id, user.invited_at)
            }
        } else {
            // TODO: Error handling
        }
    }

    async welcomeUser(accessToken:string | null, refreshToken:string | null) {
        if(this.supabaseClient && accessToken && refreshToken) {
            // Workaround to make invite tokens work:
            // https://github.com/supabase/auth-helpers/issues/567
            // more sophisticated way to handle (look into this when/if time, 6 weeks is short short):
            // https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr#create-api-endpoint-for-handling-tokenhash
            const { error } = await this.supabaseClient.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            });
            if(error) {
                //TODO:error handling
                store.dispatch(inviteeLoginFail());  
            } else {   
                store.dispatch(inviteeLogin());  
                // send data to backend that user has signed up.. email, userid            
            }
        }
    }

    async loginUser() {
        const user = await this.getUser();
        if(user) {
            store.dispatch(login());  
        }
    }

    getAuthenticationStatus() {
        return store.getState().auth.status;
    }

    async getUser() {
        if(this.supabaseClient) {
            const { data: { user } } = await this.supabaseClient.auth.getUser();
            return user;
        } 
        return null;
    }

    async getSession() {
        if(this.supabaseClient) {
            return await this.supabaseClient.auth.getSession();
        } 
        
        return null;
    }

    async logOut() {
        const { error } = await this.supabaseClient.auth.signOut();
        if(error) {
            // TODO: what should we do???
        }
        store.dispatch(logout());
    }
}

export const authentication = new Authentication();