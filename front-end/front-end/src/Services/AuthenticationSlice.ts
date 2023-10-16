import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// TODO: are all these needed??
export enum AuthenticationStatus {
    NotAuthenticated = "init",
    Pending = "pending",
    InviteeAuthenticated = "invitee",
    AdminAuthenticated = "admin",
    CandidateAuthenticated = "candidate",
    AccessTokenInvalid = "accesstokenfail",
    LoginInvalid = "loginfail",
    LoggedOut = "loggedout",
    SignupFailed = "signupfail",
}

export enum LoginType {
    Non = "no user",
    NormalLogin = "normal",
    Invited = "invitee",
}

export interface InitialState {
    status: AuthenticationStatus,
    loginType: LoginType,
    token: string,
}

const initialState: InitialState = {
    status: AuthenticationStatus.NotAuthenticated,
    loginType: LoginType.Non,
    token: "",
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, secretid }:{email: string | undefined, secretid: string | null}) => {
    let result;
    if (email && secretid) {
      result = await axios.post(`${apiUrl}/login/`, {
          username: email,
          password: secretid,
      });
    }
    if (result?.status === 200) {
      return result.data;
    } else {
      // TODO: error handling
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, secretid }:{email: string | undefined, secretid: string | null}) => {
    let result;
    if (email && secretid) {
      result = await axios.post(`${apiUrl}/signup/`, {
          username: email,
          password: secretid,
          email: email,
      });
    }
    if (result?.status === 200) {
      return result.data.token;
    } else {
      console.log("error signingup", result?.status, result)
    }
  }
);

export const authenticationSlice = createSlice({
    name: "authenticationSlice",
    initialState: initialState,
    reducers: {
        logout(state) {
            state.status = AuthenticationStatus.LoggedOut;
            state.loginType = LoginType.Non;
        },
        inviteeLogin(state) {
            state.status = AuthenticationStatus.InviteeAuthenticated;
            state.loginType = LoginType.Invited;
        }, 
        inviteeLoginFail(state) {
            state.status = AuthenticationStatus.AccessTokenInvalid;
            state.loginType = LoginType.Invited;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.status = AuthenticationStatus.Pending;
          })
          .addCase(login.fulfilled, (state, action) => {
            if(action.payload.user.is_staff) {
              state.status = AuthenticationStatus.AdminAuthenticated;
            } else {
              state.status = AuthenticationStatus.CandidateAuthenticated;
            }
            state.loginType = LoginType.NormalLogin;

            state.token = action.payload.token;            
          })
          .addCase(login.rejected, (state, action) => {
            state.status = AuthenticationStatus.LoginInvalid;
            console.log("login failed", action.error);
            // TODO: error handling
          })
          .addCase(signup.fulfilled, (state, action) => {
            state.status = AuthenticationStatus.CandidateAuthenticated;

            state.token = action.payload;
          })
          .addCase(signup.rejected, (state, action) => {
            state.status = AuthenticationStatus.SignupFailed;
            console.log("invitee signup failed", action.error);
              // TODO: error handling
          });
    },
});

export const { inviteeLogin, inviteeLoginFail, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;