import { SupabaseClient, createClient } from '@supabase/supabase-js'

import { store } from "./Store";
import { login, inviteeLogin, inviteeLoginFail, logout, signup } from './AuthenticationSlice';

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
        // TODO: handling of sending invitation twice to same person  --- needs the invitee list to exist and be fetchable in backend
        if(this.adminSupabaseClient) {
            const userData = {
                email: email,
                // TODO: will this be used in the future or shall we store locally?
                user_metadata: { type: 'candidate' }
            }

            const { data: user, error } = await this.adminSupabaseClient.auth.admin
                        .inviteUserByEmail(email, 
                            { 
                                redirectTo: this.appUrl+"/signup#",
                                data: userData,
                            });
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

    async inviteeLogin(accessToken:string | null, refreshToken:string | null) {
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
                // TODO: modify inviteeLogin to be a backend api call
                // send data to backend that user has signed up.. email, userid, date, type
                // in the future the association will want to see a list of who has been invited for what, when and have they signed up
            }
        }
    }

    async loginUser() {
        const user = await this.getUser();
        if(user) {
            store.dispatch(login({email: user.email, secretid: user.id}));  
        }
    }

    async signupInvitee(password:string) {
        const user = await this.getUser();
        if(user) {
            // TODO: improve error handling
            await this.supabaseClient.auth.updateUser({ password: password })
            store.dispatch(signup({email: user.email, secretid: user.id}));  
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