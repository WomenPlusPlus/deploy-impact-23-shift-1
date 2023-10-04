import { createSlice } from "@reduxjs/toolkit";

export enum AuthenticationStatus {
    NotAuthenticated = "init",
    Authenticated = "success",
    AccessTokenInvalid = "accesstokenfail",
    LoginInvalid = "loginfail",
    LoggedOut = "loggedout",
}

export enum UserType {
    Non = "no user",
    NormalLogin = "normal",
    Invited = "invitee",
}

export interface InitialState {
    status: AuthenticationStatus,
    userType: UserType,
}

const initialState: InitialState = {
    status: AuthenticationStatus.NotAuthenticated,
    userType: UserType.Non,
}

export const authenticationSlice = createSlice({
    name: "authenticationSlice",
    initialState: initialState,
    reducers: {
        login(state) {
            state.status = AuthenticationStatus.Authenticated;
            state.userType = UserType.NormalLogin;
        },
        logout(state) {
            state.status = AuthenticationStatus.LoggedOut;
            state.userType = UserType.Non;
        },
        inviteeLogin(state) {
            state.status = AuthenticationStatus.Authenticated;
            state.userType = UserType.Invited;
        }, 
        inviteeLoginFail(state) {
            state.status = AuthenticationStatus.AccessTokenInvalid;
            state.userType = UserType.Invited;
        }
    }
});

export const { login, inviteeLogin, inviteeLoginFail, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;